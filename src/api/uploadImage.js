import AWS from 'aws-sdk';

// Configura as credenciais de acesso
AWS.config.update({
  accessKeyId: process.env.VUE_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.VUE_APP_AWS_SECRET_ACCESS_KEY,
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
