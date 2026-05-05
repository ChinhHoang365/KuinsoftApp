# 📁 Cấu Trúc Dự Án Mới - KuinsoftApp

## 🎯 Tổng Quan

Dự án đã được tái cấu trúc để tăng tính modular, dễ bảo trì và mở rộng.

---

## 📂 Cấu Trúc Thư Mục

```
src/
├── components/                    # React Components
│   ├── common/                    # Reusable components
│   ├── modules/                   # Feature-specific components
│   ├── admin/                     # Admin components
│   ├── auth/                      # Authentication components
│   ├── client/                    # Client-facing components
│   └── layout/                    # Layout components
│
├── layouts/                       # Page Layouts (NEW)
│   ├── AdminLayout.tsx            # Admin dashboard layout
│   ├── PublicLayout.tsx           # Public pages layout
│   └── index.ts
│
├── pages/                         # Page components
│   ├── admin/                     # Admin pages
│   ├── client/                    # Client pages
│   └── home/                      # Home page
│
├── services/                      # API Services
│   ├── axios.customize.ts         # Axios configuration
│   ├── admin/                     # Admin APIs (legacy, use modules)
│   └── modules/                   # Organized API modules (NEW)
│       ├── admin.ts               # Re-export all admin APIs
│       └── index.ts
│
├── context/                       # React Context (NEW)
│   ├── AppContext.tsx             # App state context
│   └── index.ts
│
├── hooks/                         # Custom React Hooks (NEW)
│   ├── useAuth.ts                 # Authentication hook
│   └── index.ts
│
├── utils/                         # Utility Functions (NEW)
│   ├── dateFormat.ts              # Date utilities
│   ├── stringUtils.ts             # String utilities
│   └── index.ts
│
├── constants/                     # Constants (NEW)
│   ├── api.constants.ts           # API endpoints
│   ├── routes.constants.ts        # Route paths
│   └── index.ts
│
├── config/                        # Configuration (NEW)
│   ├── app.config.ts              # App configuration
│   └── index.ts
│
├── types/                         # TypeScript Types
│   ├── global.d.ts                # Global type definitions
│   └── axios.d.ts
│
├── styles/                        # Global Styles
│   └── global.css
│
├── main.tsx                       # Entry point
└── vite-env.d.ts
```

---

## ✅ Perubahan Chính

### 1. **Layouts** (Mới)
- **Trước**: `src/layout.admin.tsx`, `src/layout.tsx`
- **Sau**: `src/layouts/AdminLayout.tsx`, `src/layouts/PublicLayout.tsx`
- **Import**: `import { AdminLayout, PublicLayout } from 'layouts'`

### 2. **Context** (Tách riêng)
- **Trước**: `src/components/context/app.context.tsx`
- **Sau**: `src/context/AppContext.tsx`
- **Import**: `import { AppProvider, useCurrentApp } from 'context'`

### 3. **API Services** (Reorganized)
- **Trước**: Import từ `services/admin/users.api.ts`, `services/admin/students.api.ts`
- **Sau**: Import từ `services/modules/admin`
- **Ví dụ**:
  ```typescript
  // OLD
  import { userSearchAPI } from 'services/admin/users.api';
  import { searchStudentsAPI } from 'services/admin/students.api';
  
  // NEW
  import { userSearchAPI, searchStudentsAPI } from 'services/modules/admin';
  ```

### 4. **Hooks** (Mới)
- Custom hooks cho business logic
- **Ví dụ**: `useAuth()` - Authentication hook
- **Import**: `import { useAuth } from 'hooks'`

### 5. **Utils** (Mới)
- Utility functions được organize
- **Ví dụ**: `formatDate()`, `truncateString()`
- **Import**: `import { formatDate, truncateString } from 'utils'`

### 6. **Constants** (Mới)
- Centralized constants
- **Ví dụ**: `ROUTES`, `API_ENDPOINTS`
- **Import**: `import { ROUTES, API_ENDPOINTS } from 'constants'`

### 7. **Config** (Mới)
- App configuration
- **Ví dụ**: `appConfig`
- **Import**: `import { appConfig } from 'config'`

---

## 📌 Import Examples

### Before ❌
```typescript
import { useCurrentApp } from 'components/context/app.context';
import LayoutAdmin from './layout.admin.tsx';
import { userSearchAPI } from 'services/admin/users.api';
```

### After ✅
```typescript
import { useCurrentApp } from 'context';
import { AdminLayout } from 'layouts';
import { userSearchAPI } from 'services/modules/admin';
```

---

## 🚀 Best Practices

1. **Layouts**: Tất cả layouts nên nằm trong `src/layouts/`
2. **Context**: Tất cả context nên nằm trong `src/context/`
3. **Hooks**: Tất cả custom hooks nằm trong `src/hooks/`
4. **Utils**: Tất cả utility functions nằm trong `src/utils/`
5. **Constants**: Tất cả constants nằm trong `src/constants/`
6. **API**: Import từ `services/modules/` thay vì `services/admin/`

---

## 🔄 Migration Checklist

- [x] Tạo `src/layouts/` folder
- [x] Tạo `src/context/` folder
- [x] Tạo `src/hooks/` folder
- [x] Tạo `src/utils/` folder
- [x] Tạo `src/constants/` folder
- [x] Tạo `src/config/` folder
- [x] Tạo `services/modules/` aggregator
- [x] Cập nhật `tsconfig.app.json` aliases
- [x] Cập nhật `src/main.tsx` imports
- [x] Cập nhật page imports
- [x] Xóa/backup files cũ (optional)

---

## ⚠️ Legacy Files

Các file sau vẫn tồn tại nhưng **không còn được dùng**:
- `src/layout.admin.tsx` → Thay bằng `src/layouts/AdminLayout.tsx`
- `src/layout.tsx` → Thay bằng `src/layouts/PublicLayout.tsx`
- `src/components/context/app.context.tsx` → Thay bằng `src/context/AppContext.tsx`

Các file này có thể xóa sau khi đảm bảo không còn import từ chúng.

---

## 🎨 TypeScript Aliases

Đã được cấu hình trong `tsconfig.app.json`:

```typescript
import { ... } from 'layouts'
import { ... } from 'context'
import { ... } from 'hooks'
import { ... } from 'utils'
import { ... } from 'constants'
import { ... } from 'config'
import { ... } from 'services/modules'
import { ... } from 'components'
import { ... } from 'pages'
```

---

## 📝 Thêm File Mới

### Thêm Hook Mới
1. Tạo file trong `src/hooks/`
2. Export từ `src/hooks/index.ts`

### Thêm Util Mới
1. Tạo file trong `src/utils/`
2. Export từ `src/utils/index.ts`

### Thêm Constant Mới
1. Tạo file trong `src/constants/`
2. Export từ `src/constants/index.ts`

---

## 🔗 Tài Liệu Liên Quan

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Ant Design Documentation](https://ant.design)

---

**Last Updated**: May 2026
**Version**: 1.0.0
