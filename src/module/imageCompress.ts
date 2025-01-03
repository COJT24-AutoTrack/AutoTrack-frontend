import imageCompression from 'browser-image-compression';

const compressImage = async (file: File): Promise<File> => {
    const options = {
        maxSizeMB: 1,           // 最大サイズ 1MB
        maxWidthOrHeight: 800, // 最大幅または高さ どれだけウィンドウを大きくしても800pxだったので一旦これで
        useWebWorker: true      // 圧縮処理をバックグラウンドで実行
    };
    console.log('originalFile instanceof Blob', file instanceof Blob); // true

    try {
        const compressedFile = await imageCompression(file, options);
        console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        console.log(`圧縮前のサイズ: ${file.size / 1024 / 1024} MB`);
        console.log(`圧縮後のサイズ: ${compressedFile.size / 1024 / 1024} MB`);

        // 元のファイル名を継承
        const fileName = file.name;
        const renamedCompressedFile = new File([compressedFile], fileName, {
            type: compressedFile.type
        });

        return renamedCompressedFile;
    } catch (error) {
        console.error('画像の圧縮に失敗しました:', error);
        throw error;
    }
};

export default compressImage;
