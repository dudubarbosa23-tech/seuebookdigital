const { Client } = require('pg');

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);

  const client = new Client({
    connectionString: process.env.NEON_DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    await client.query(
      'INSERT INTO mensagens(nome, email, mensagem) VALUES($1, $2, $3)',
      [body.nome, body.email, body.mensagem]
    );
    await client.end();
    return { statusCode: 200, body: JSON.stringify({ message: "Mensagem salva!" }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
