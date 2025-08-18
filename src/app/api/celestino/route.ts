import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL = 'https://n8n-wbh.artemi.com.br/webhook/5d8149ad-ccf7-4c4f-af93-a43f4629aa24';
const AUTHORIZATION_TOKEN = 'portal_espiritual_2025_a8f3d9e2b7c4f1a6e9d8c5b2a7f4e1d9c6b3a0f7e4d1c8b5a2f9e6d3c0b7a4f1e8d5c2b9f6a3e0d7c4b1a8f5e2d9c6b3a0f7e4d1c8b5a2f9e6d3c0b7a4f1e8';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar se os campos obrigatórios estão presentes
    if (!body.message || !body.userName || !body.userId || !body.language) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: message, userName, userId, language' },
        { status: 400 }
      );
    }

    // Fazer a requisição para o webhook
    console.log('Enviando requisição para webhook:', {
      url: WEBHOOK_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': AUTHORIZATION_TOKEN,
      },
      body: {
        message: body.message,
        userName: body.userName,
        userId: body.userId,
        language: body.language,
      }
    });

    // Tentar diferentes formatos de autenticação
    const webhookData = {
      message: body.message,
      userName: body.userName,
      userId: body.userId,
      language: body.language,
      token: AUTHORIZATION_TOKEN, // Adicionar token no body
    };

    const response = await fetch(`${WEBHOOK_URL}?token=${AUTHORIZATION_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': AUTHORIZATION_TOKEN, // Voltar ao formato original
        'x-api-key': AUTHORIZATION_TOKEN,
      },
      body: JSON.stringify(webhookData),
    });

    console.log('Resposta do webhook:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro na resposta do webhook:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      return NextResponse.json(
        { error: 'Erro na comunicação com o serviço' },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log('Dados recebidos do webhook:', data);
    
    // Retornar a resposta do webhook
    return NextResponse.json({
      message: data.message || 'Resposta recebida com sucesso'
    });

  } catch (error) {
    console.error('Erro na API do Celestino:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// Método GET não permitido
export async function GET() {
  return NextResponse.json(
    { error: 'Método GET não permitido. Use POST.' },
    { status: 405 }
  );
}