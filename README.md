#Setup
Router
npm install --save-exact react-router-dom@7.14.0

CSS
npm i --save-exact sass@1.80.4

Path
npm i --save-exact --save-dev vite-tsconfig-paths@5.0.1

Cài đặt antd: 
npm install --save-exact antd@5.21.6 @ant-design/icons@5.5.1

Cài đặt Axios:         
npm install --save-exact axios@1.7.7

1. Tại sao cần customize Axios ?
- Tập trung config lại 1 file
- Can thiệp vào request (trước khi gửi lên server backend)
- Can thiệp vào response (trước khi trả về cho client)

Cai dat Spinner
npm install --save-exact react-spinners@0.14.1

Cài đặt thư viện:

npm i --save-exact @ant-design/pro-components@2.8.

## Hướng dẫn thay đổi Logo dự án
Mỗi lần bạn cần đổi logo khác cho dự án (ở trang Đăng nhập và thanh Menu bên trái của Admin), hãy làm theo các bước sau:

**Bước 1: Lưu file ảnh logo mới**
- Đưa file ảnh logo mới của bạn (ví dụ: `logo-moi.png` hoặc `logo-moi.jpg`) vào thư mục `public/images/`.
- Cách nhanh nhất: Nếu bạn đặt tên file mới giống hệt file cũ là `logo.jpg` và ghi đè lên file cũ trong thư mục `public/images/`, hệ thống sẽ tự cập nhật ảnh mới mà **không cần làm Bước 2**.

**Bước 2: Đổi đường dẫn ảnh trong Code (Nếu tên file hoặc đuôi file khác `logo.jpg`)**
Nếu file mới có tên khác (ví dụ `logo.png`), bạn cần tìm và sửa lại đường dẫn `<img src="/images/logo.jpg" />` thành `<img src="/images/logo.png" />` tại 3 file sau:
1. `src/pages/admin/login.tsx` (Logo ở màn hình đăng nhập)
2. `src/layouts/AdminLayout.tsx` (Logo ở góc trái thanh menu của trang quản trị)
3. `src/layout.admin.tsx` (Bản dự phòng của Admin Layout)

**Lưu ý về kích thước:**
- Hệ thống đã tự động giới hạn `maxWidth` (chiều rộng tối đa) để ảnh không bị tràn và tự động thu nhỏ lại thành dạng icon khi người dùng bấm thu gọn menu. Do đó bạn không cần lo lắng về việc ảnh bị méo hay quá to. Tuy nhiên, nên dùng ảnh nền trong suốt (PNG) hoặc ảnh cắt vuông vức/ngang để có trải nghiệm thị giác tốt nhất.
