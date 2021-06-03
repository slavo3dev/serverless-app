async function hello(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello Slavo3, its working' }),
  };
}

export const handler = hello;


