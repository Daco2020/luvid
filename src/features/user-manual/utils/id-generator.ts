export function generateReportId(): string {
  // 현재 시간을 36진수로 변환하여 길이를 줄임 (예: 'lz5j8x9' 등)
  const timestamp = Date.now().toString(36);
  
  // 0~999 사이의 난수 생성 후 3자리로 맞춤 (예: '007', '123')
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  // 조합하여 반환 (예: 'lz5j8x9042')
  return `${timestamp}${random}`;
}
