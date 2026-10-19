# Graduation Invitation 🎓

Trang thiệp mời Lễ Tốt Nghiệp phong cách điện ảnh cao cấp (Cinematic Luxury) được xây dựng bằng **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Three.js**, **Framer Motion**, **Lucide Icons** và **Canvas Confetti**.

---

## ✨ Tính năng nổi bật

- **Phong bì tương tác (Interactive 3D Envelope)**:
  - Vòng sóng phát xung (`pulsing ring`) quanh con dấu sáp vàng luôn hoạt động mời người xem nhấn mở.
  - Hiệu ứng quét vệt sáng kim loại và đổ bóng 3D chân thực.
  - Pháo hoa hoàng kim bung tỏa rực rỡ (`canvas-confetti`) ngay khi mở thiệp.
- **Thiệp mời cử nhân / kỹ sư sang trọng**:
  - Tích hợp ảnh chân dung cử nhân đã tách nền đặt trong vòm hào quang ánh sáng, bố cục song song (side-by-side) giúp tiết kiệm chiều cao và dễ nhìn trên cả máy tính lẫn điện thoại.
  - Đầy đủ thông tin: Tên, Ngày, Giờ, Địa điểm (HUTECH Thu Duc Campus), Số điện thoại (chạm để gọi trực tiếp).
  - Nút **Mở bản đồ** trỏ trực tiếp đến tọa độ Google Maps chính xác.
- **Nền không gian 3D tương tác (Three.js 3D Background)**:
  - Khối lập phương tinh thể không gian nổi bồng bềnh và vòng nhẫn wireframe phát sáng (Cyan, Indigo, Gold).
  - Tương tác nghiêng xoay theo hướng rê chuột (mouse move) hoặc vuốt chạm (touch move).
  - Bố cục mở rộng về các cạnh, không che khuất phong bì hay thiệp mời ở trung tâm.
- **Trình phát nhạc nền (Soundtrack Player)**:
  - Tự động phát nhạc ngay khi vào trang (`autoPlay` với cơ chế mở khóa âm thanh tương tác đa điểm).
  - Chùm sáng xoay tròn liên tục (`spin-orbit`) bao quanh div phát nhạc kèm hiệu ứng sóng âm nhịp nhàng.
- **Favicon tùy chỉnh**:
  - Biểu tượng nón cử nhân phối màu Đỏ - Vàng hoàng kim chuẩn kích thước mọi trình duyệt.
- **Tối ưu Responsive**:
  - Giao diện linh hoạt, vừa vặn từ màn hình điện thoại (375px) đến máy tính bảng và màn hình lớn.

---

## 🚀 Khởi chạy dự án

### Cài đặt dependencies:
```bash
npm install
```

### Chạy môi trường phát triển (Dev Server):
```bash
npm run dev
```
Truy cập [http://localhost:3000](http://localhost:3000) trên trình duyệt.

### Đóng gói sản xuất (Production Build):
```bash
npm run build
npm start
```

---

## 📁 Cấu trúc thư mục

```text
graduation-invitation/
├── public/
│   ├── images/
│   │   ├── graduation.png    # Ảnh chân dung cử nhân (đã tách nền)
│   │   └── favicon.svg       # Favicon nón cử nhân
│   ├── music/
│   │   └── music.mp3         # Nhạc nền phát tự động
│   └── favicon.svg
├── src/
│   ├── app/
│   │   ├── globals.css       # Toàn bộ CSS tokens, gradients và keyframe animations
│   │   ├── icon.svg          # Next.js App Router favicon route
│   │   ├── layout.tsx        # Font Cormorant Garamond, Montserrat & Metadata SEO
│   │   └── page.tsx          # Entry page gọi Homepage view
│   ├── components/
│   │   ├── Envelope.tsx      # Phong bì mở thư với con dấu sáp phát xung
│   │   ├── GalaxyBackground.tsx # Nền 3D Three.js tinh thể và vòng nhẫn tương tác
│   │   ├── Invitation.tsx    # Nội dung thiệp mời, hình ảnh và nút bản đồ
│   │   └── MusicPlayer.tsx   # Trình phát nhạc nền với hiệu ứng orbit xoay quanh
│   ├── data/
│   │   └── invitation.ts     # Hằng số chứa toàn bộ thông tin thiệp mời
│   └── views/
│       └── homepage/
│           └── homepage.tsx  # View trang chủ kết nối các component
```

---

## ⚙️ Tùy chỉnh thông tin

Mọi thông tin về buổi lễ tốt nghiệp được quản lý tập trung tại file **`src/data/invitation.ts`**:

```typescript
export const INVITATION_INFO = {
  name: 'Lê Hồng Trung Hải',
  role: 'Tân kỹ sư',
  date: 'Chủ nhật, 8 tháng 11, 2026',
  time: '09:00 sáng',
  university: 'HUTECH - Đại học Công nghệ TP.HCM',
  campus: 'Thu Duc Campus',
  address: 'Khu Công nghệ cao XLHN, Tăng Nhơn Phú, Hồ Chí Minh, Việt Nam',
  phone: '0978408325',
  coordinates: {
    lat: 10.856022683794722,
    lng: 106.78555315190036,
  },
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=10.856022683794722,106.78555315190036',
  photoUrl: '/images/graduation.png',
};
```

- **Thay ảnh đại diện**: Đặt file ảnh PNG đã xóa phông vào thư mục `public/images/graduation.png`.
- **Thay nhạc nền**: Thay file âm thanh vào `public/music/music.mp3`.
- **Thay màu sắc / hiệu ứng**: Chỉnh sửa tại `src/app/globals.css`.

---

© 2026 Class of 2026 · Lê Hồng Trung Hải
