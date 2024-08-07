export const CalcFileSize = (size: number) => {
    var fSExt = new Array('Bytes', 'KB', 'MB', 'GB')
    let i = 0
    while (size > 900) {
        size /= 1024
        i++
    }

    var exactSize = (Math.round(size * 100) / 100) + ' ' + fSExt[i]
    return exactSize
}

export function getRandomColor(): string {
    // Tạo một số ngẫu nhiên từ 0 đến 16777215 (0xFFFFFF)
    const randomColor = Math.floor(Math.random() * 16777215);

    // Chuyển số ngẫu nhiên thành chuỗi hex
    const hexColor = `#${randomColor.toString(16).padStart(6, '0')}`;

    return hexColor;
}

export function getRandomColorRGBA() {
    const listColor = [
        'rgba(113, 77, 217, 0.9)',
        'rgba(39,245,230,0.8)',
        'rgba(58,245,39,0.8)',
        'rgba(245,39,101,0.8)',
    ]
    const index = Math.floor(Math.random() * 4);

    return listColor[index];
}