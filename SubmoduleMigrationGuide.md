Since your packages are part of a **PNPM monorepo**, the process of splitting them into separate Git repositories while maintaining their functionality within the monorepo requires careful handling. Below is a step-by-step guide to **properly extracting** them while keeping them as Git submodules.

---

## **Step 1: Backup Your Monorepo**
Before proceeding, create a backup of your monorepo:
```sh
git clone --mirror <your-repo-url> monorepo-backup
```
This ensures you can restore everything in case something goes wrong.

---

## **Step 2: Create New Git Repositories**
Go to GitHub, GitLab, or another Git hosting service and create three **new repositories** for:
- `backend`
- `web`
- `admin`

---

## **Step 3: Extract Each Package While Keeping History**
To preserve commit history for each package, use `git filter-repo` (preferred over `git filter-branch`).

### **Install `git-filter-repo` (if not installed)**
```sh
# On macOS
brew install git-filter-repo

# On Linux (Debian/Ubuntu)
sudo apt install git-filter-repo -y

# On Windows (via Python)
pip install git-filter-repo
```

### **Extract Each Package**
#### **1. Extract `backend`**
```sh
git clone <your-monorepo-url> backend
cd backend
git filter-repo --subdirectory-filter packages/backend
git remote set-url origin <backend-repo-url>
git push -u origin main
cd ..
```

#### **2. Extract `web`**
```sh
git clone <your-monorepo-url> web
cd web
git filter-repo --subdirectory-filter packages/web
git remote set-url origin <web-repo-url>
git push -u origin main
cd ..
```

#### **3. Extract `admin`**
```sh
git clone <your-monorepo-url> admin
cd admin
git filter-repo --subdirectory-filter packages/admin
git remote set-url origin <admin-repo-url>
git push -u origin main
cd ..
```

---

## **Step 4: Remove Extracted Packages from Monorepo**
After successfully pushing each package, remove them from the monorepo:
```sh
cd <your-monorepo>
git rm -r packages/backend packages/web packages/admin
git commit -m "Removed extracted packages"
```

---

## **Step 5: Add the Packages as Git Submodules**
Now, add the newly created repositories as submodules:
```sh
git submodule add <backend-repo-url> packages/backend
git submodule add <web-repo-url> packages/web
git submodule add <admin-repo-url> packages/admin
git commit -m "Added backend, web, and admin as submodules"
```

---

## **Step 6: Update PNPM Configuration**
Since you are using a **PNPM workspace**, update `pnpm-workspace.yaml` to ensure submodules are still recognized as part of the monorepo.

### **Before:**
Your current `pnpm-workspace.yaml` might look like:
```yaml
packages:
  - "packages/backend"
  - "packages/web"
  - "packages/admin"
```

### **After:**
Modify it to include submodules:
```yaml
packages:
  - "packages/backend/*"
  - "packages/web/*"
  - "packages/admin/*"
```

---

## **Step 7: Initialize and Update Submodules**
When cloning the monorepo, you must ensure the submodules are updated:
```sh
git clone --recurse-submodules <your-monorepo-url>
cd <your-monorepo>
pnpm install
```
Or, if the repo is already cloned:
```sh
git submodule update --init --recursive
pnpm install
```

---

## **Step 8: Managing Updates in Submodules**
When making changes to a package (`backend`, `web`, or `admin`), follow these steps:

1. **Go into the submodule**
   ```sh
   cd packages/backend
   ```

2. **Pull latest changes from the submodule**
   ```sh
   git pull origin main
   ```

3. **Make your changes and push to its repository**
   ```sh
   git add .
   git commit -m "Updated backend"
   git push origin main
   ```

4. **Update the reference in the monorepo**
   ```sh
   cd ../..
   git add packages/backend
   git commit -m "Updated backend submodule reference"
   git push origin main
   ```

---

## **Conclusion**
Now, you have successfully **split your PNPM monorepo** while keeping the packages as Git submodules. This allows:
✅ Independent repositories with history preserved  
✅ PNPM monorepo structure still working  
✅ Easy updates through Git submodules  

🚀 **Now your monorepo is cleaner, and each package can be managed separately while still being part of the workspace!**
