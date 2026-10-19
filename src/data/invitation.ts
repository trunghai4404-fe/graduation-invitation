export interface InvitationInfo {
  name: string;
  role: string;
  date: string;
  time: string;
  university: string;
  campus: string;
  address: string;
  fullLocation: string;
  phone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  mapUrl: string;
  photoUrl: string;
  message: string;
  quote: string;
  subQuote: string;
}

export const INVITATION_INFO: InvitationInfo = {
  name: 'Lê Hồng Trung Hải',
  role: 'Tân kỹ sư',
  date: 'Chủ nhật, 8 tháng 11, 2026',
  time: '09:00 sáng',
  university: 'HUTECH - Đại học Công nghệ TP.HCM',
  campus: 'Thu Duc Campus',
  address: 'Khu Công nghệ cao XLHN, Tăng Nhơn Phú, Hồ Chí Minh, Việt Nam',
  fullLocation: 'HUTECH - Đại học Công nghệ TP.HCM (Thu Duc Campus). Khu Công nghệ cao XLHN, Tăng Nhơn Phú, Hồ Chí Minh, Việt Nam',
  phone: '0978408325',
  coordinates: {
    lat: 10.856022683794722,
    lng: 106.78555315190036,
  },
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=10.856022683794722,106.78555315190036',
  photoUrl: '/images/graduation.png',
  message: 'trong ngày đặc biệt đánh dấu hành trình học tập, những nỗ lực đã qua và khởi đầu của một chặng đường mới.',
  quote: 'A milestone worth celebrating',
  subQuote: 'Sự hiện diện của bạn là niềm vinh hạnh và hạnh phúc lớn của mình.',
};
