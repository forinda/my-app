#!/usr/bin/env node

// visualize-deps.mjs - Visualize package dependencies
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import chalk from 'chalk';

const PACKAGES_DIR = './packages';
const packages = {};
const dependencies = {};

// Read all package.json files in packages directory
try {
  const dirs = readdirSync(PACKAGES_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  dirs.forEach(dir => {
    try {
      const pkgPath = join(PACKAGES_DIR, dir, 'package.json');
      const pkgContent = readFileSync(pkgPath, 'utf8');
      const pkg = JSON.parse(pkgContent);
      
      packages[pkg.name] = {
        path: dir,
        version: pkg.version
      };
      
      // Collect dependencies
      const allDeps = {
        ...(pkg.dependencies || {}),
        ...(pkg.devDependencies || {}),
        ...(pkg.peerDependencies || {})
      };
      
      dependencies[pkg.name] = Object.keys(allDeps)
        .filter(dep => packages[dep] || Object.keys(packages).includes(dep));
      
    } catch (err) {
      console.error(`Error reading package.json in ${dir}:`, err.message);
    }
  });
  
  // Print the dependency tree
  console.log(chalk.bold('\n📦 PACKAGE DEPENDENCIES\n'));
  
  Object.keys(packages).forEach(pkgName => {
    console.log(chalk.green(`${pkgName} (${packages[pkgName].version || 'unknown'})`));
    
    if (dependencies[pkgName] && dependencies[pkgName].length) {
      dependencies[pkgName].forEach(dep => {
        console.log(`  ${chalk.blue('↳')} ${dep}`);
      });
    } else {
      console.log(`  ${chalk.gray('(no internal dependencies)')}`);
    }
    console.log('');
  });
  
  // Print a simplified build order
  const getBuildOrder = () => {
    const result = [];
    const visited = new Set();
    const temp = new Set();
    
    function visit(pkg) {
      if (temp.has(pkg)) {
        console.error(chalk.red(`Circular dependency detected: ${pkg}`));
        return;
      }
      
      if (visited.has(pkg)) return;
      
      temp.add(pkg);
      
      if (dependencies[pkg]) {
        for (const dep of dependencies[pkg]) {
          visit(dep);
        }
      }
      
      temp.delete(pkg);
      visited.add(pkg);
      result.push(pkg);
    }
    
    for (const pkg of Object.keys(packages)) {
      if (!visited.has(pkg)) {
        visit(pkg);
      }
    }
    
    return result;
  };
  
  const buildOrder = getBuildOrder();
  
  console.log(chalk.bold('\n🔄 SUGGESTED BUILD ORDER\n'));
  buildOrder.forEach((pkg, i) => {
    console.log(`${i+1}. ${chalk.yellow(pkg)}`);
  });
  
} catch (err) {
  console.error('Error reading packages directory:', err.message);
}
