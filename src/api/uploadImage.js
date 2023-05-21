import AWS from 'aws-sdk';

// Configura as credenciais de acesso
AWS.config.update({
  accessKeyId: 'AKIAQNTVEQCNL3C7NJUZ',
  secretAccessKey: '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',
});

// Cria uma instância do serviço S3
const s3 = new AWS.S3();

export default async function uploadImageToS3(file) {
  const params = {
    Bucket: 'rotas-rurais',
    Key: `images/${Date.now()}_${file.name}`, // path/to/upload/image.jpg
    Body: file,
    ACL: 'public-read', // Define as permissões de acesso à imagem
  };

  try {
    const response = await s3.upload(params).promise();
    console.log('Imagem enviada com sucesso:', response.Location);
    return response;
    // Faça algo com a URL da imagem enviada, por exemplo,
    // armazene-a no banco de dados ou exiba-a na interface do usuário
  } catch (error) {
    console.error('Erro ao enviar a imagem:', error);
    return error;
  }
}
