import fs from 'fs';
import { injectable } from 'inversify';
import { Dependency } from '../di';
import path from 'path';

type RecursiveOptions = {
  recursive?: boolean;
};

@injectable()
@Dependency()
export class FileManager {
  /**
   *
   * @param {string} folderPath
   * @returns {boolean}
   */
  doesFolderExist(folderPath: string): boolean {
    if (fs.existsSync(folderPath)) {
      return true;
    }

    return false;
  }

  createFolder(folderPath: string, options?: RecursiveOptions): void {
    const { recursive } = options || {};

    if (!this.doesFolderExist(folderPath)) {
      fs.mkdirSync(folderPath, { recursive });
      console.info('[FILE_MANAGER]', 'Folder created');
    } else {
      console.warn('[FILE_MANAGER]', 'Folder already exists');
    }
  }

  /**
   *
   * @param {string} filePath
   * @returns {boolean}
   */
  doesFileExist(filePath: string): boolean {
    if (fs.existsSync(filePath)) {
      return true;
    }

    return false;
  }

  /**
   *
   * @param {string} filePath
   * @param {string} data
   */
  writeFile(filePath: string, data: string = ''): void {
    fs.writeFileSync(filePath, data);
  }

  /**
   *
   * @param {string} filePath
   * @description Deletes a file
   * @returns {void}
   * @memberof FileManager
   * @example
   * deleteFile('path/to/file.txt')
   * @example
   * deleteFile('path/to/file.txt')
   */
  deleteFile(filePath: string): void {
    fs.unlinkSync(filePath);
  }

  /**
   *
   * @param {string} folderPath
   * @description Deletes a folder
   * @returns {void}
   * @memberof FileManager
   * @example
   * deleteFolder('path/to/folder')
   */
  deleteFolder(folderPath: string, options?: RecursiveOptions): void {
    const { recursive } = options || {};

    fs.rmdirSync(folderPath, {
      recursive: !!recursive
    });
  }

  /**
   *
   * @param {string} folderPath
   * @description Lists all files in a folder
   * @returns {string[]}
   * @memberof FileManager
   * @example
   * listFiles('path/to/folder')
   */
  listFiles(folderPath: string, options?: RecursiveOptions): string[] {
    // console.log('listFiles', folderPath);

    const { recursive } = options || {};
    const doesFolderExist = this.doesFolderExist(folderPath);

    if (!doesFolderExist) {
      return [];
    }
    const files = fs.readdirSync(folderPath);

    if (recursive) {
      let allFiles: string[] = [];

      files.forEach((file) => {
        const filePath = path.join(folderPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          allFiles = allFiles.concat(
            this.listFiles(filePath, { recursive: !!recursive })
          );
        } else {
          allFiles.push(filePath);
        }
      });

      return allFiles;
    } else {
      return files.map((file) => path.join(folderPath, file));
    }
  }
}
