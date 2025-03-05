Here’s a **README** that documents the workflow for your **PNPM monorepo** with **Git submodules** for `backend`, `vue-client`, and `react-client`. It includes setup, development, and submodule management guidelines.

---

### **📘 Monorepo Workflow Guide**

This monorepo manages three projects:

- **backend** (`Express.js API`)
- **vue-client** (`Vue.js frontend`)
- **react-client** (`React.js admin panel`)

Each package is stored in a separate Git repository and integrated as a **Git submodule**.

---

## **📂 Folder Structure**

```
monorepo/
│── packages/
│   ├── backend  (Git submodule)
│   ├── vue-client      (Git submodule)
│   ├── react-client    (Git submodule)
│── pnpm-workspace.yaml
│── package.json
│── .gitmodules
│── .gitignore
```

---

## **🚀 Setup**

### **1. Clone the Monorepo**

To clone the monorepo and all submodules, run:

```sh
git clone --recurse-submodules <monorepo-repo-url>
cd monorepo
```

If you forgot to include `--recurse-submodules`, initialize and update submodules manually:

```sh
git submodule update --init --recursive
```

### **2. Install Dependencies**

Use PNPM to install dependencies across all packages:

```sh
pnpm install
```

---

## **🛠 Development Workflow**

### **1. Working on a Specific Package**

Navigate to a package:

```sh
cd packages/backend  # or packages/web, packages/admin
```

Make changes, commit, and push to its repository:

```sh
git add .
git commit -m "Updated backend feature"
git push origin main
```

Then, return to the **monorepo** and update the submodule reference:

```sh
cd ../..
git add packages/backend
git commit -m "Updated backend submodule reference"
git push origin main
```

---

### **2. Pulling Latest Changes**

To fetch and update the monorepo and all submodules:

```sh
git pull --recurse-submodules
git submodule update --recursive --remote
```

---

### **3. Adding a New Submodule**

To add a new package as a submodule:

```sh
git submodule add <repo-url> packages/new-package
git commit -m "Added new-package as a submodule"
```

---

### **4. Removing a Submodule**

1. Deinitialize and remove tracking:

   ```sh
   git submodule deinit -f packages/admin
   git rm -f packages/admin
   rm -rf .git/modules/packages/admin
   ```

2. Commit and push changes:
   ```sh
   git commit -m "Removed admin submodule"
   git push origin main
   ```

---

### **5. Renaming a Submodule**

Since Git does not allow direct renaming, follow these steps:

1. **Remove the old submodule**

   ```sh
   git submodule deinit -f packages/old-name
   git rm -f packages/old-name
   rm -rf .git/modules/packages/old-name
   git commit -m "Removed old-name submodule"
   ```

2. **Re-add it with the new name**
   ```sh
   git submodule add <repo-url> packages/new-name
   git commit -m "Renamed submodule from old-name to new-name"
   ```

---

## **🔧 Troubleshooting**

### **1. Submodule Not Updating?**

Run:

```sh
git submodule sync
git submodule update --init --recursive
```

### **2. Submodule Folder is Empty?**

Ensure submodules are initialized:

```sh
git submodule update --init
```

### **3. Switching Branches with Submodules**

When changing branches, run:

```sh
git checkout <branch-name>
git submodule update --recursive --remote
```

---

## **✅ Summary**

- Clone the monorepo with `--recurse-submodules`
- Use PNPM to install dependencies
- Work on a specific package, commit, and push
- Update submodules with `git submodule update --recursive`
- Add, remove, and rename submodules as needed

🚀 **Happy coding!** 🚀

---

Would you like me to add any additional details?
