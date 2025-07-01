import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

// Asegúrate de tener la variable de entorno OPENAI_API_KEY en tu archivo .env.local

export async function POST(req: Request) {
  try {
    const { name, description }: { name: string, description: string } = await req.json();

    if (!name && !description) {
        return Response.json({ error: 'El nombre o la descripción del producto son requeridos.' }, { status: 400 });
    }

    const prompt = `Re-escribe el siguiente nombre y descripción de producto para que sea atractivo, claro y optimizado para SEO en español. Utiliza palabras clave relevantes para un e-commerce.

    Nombre Original: "${name}"
    Descripción Original: "${description}"

    Devuelve la respuesta únicamente en formato JSON con las claves "improvedName" y "improvedDescription". No incluyas texto adicional antes o después del JSON.`;

    const { text } = await generateText({
      model: openai('gpt-4o'), // Usamos gpt-4o por su potencia y eficiencia
      system: 'Eres un experto en marketing y SEO para e-commerce. Tu tarea es mejorar los textos de los productos para maximizar las ventas y la visibilidad en buscadores.',
      prompt,
    });

    // El modelo a veces envuelve la respuesta en un bloque de código. Lo limpiamos antes de parsear.
    const cleanedText = text.replace(/```json\n?|```/g, '').trim();
    const improvedContent = JSON.parse(cleanedText);

    return Response.json(improvedContent);

  } catch (error) {
    console.error('Error al generar texto con IA:', error);
    return Response.json({ error: 'No se pudo generar el texto mejorado.' }, { status: 500 });
  }
}
