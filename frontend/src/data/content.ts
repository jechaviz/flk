export type ModeData = {
    hero: {
        tagline: string;
        headline: string;
        subtext: string;
        ctaPrimary: string;
    };
    product: {
        title: string;
        description: string[];
    };
    benefits: {
        b1: { title: string; text: string };
        b2: { title: string; text: string };
        b3: { title: string; text: string };
    };
};

export const CONTENT: Record<string, ModeData> = {
    A: {
        hero: {
            tagline: "EL NUEVO ESTÁNDAR INMOBILIARIO",
            headline:
                "Casas con <span class='animate-shine text-gold-gradient italic'>Pasaporte Global.</span>",
            subtext:
                "Diferencia tu desarrollo integrando un nivel de vida superior. El distintivo que convierte a compradores indecisos en residentes orgullosos.",
            ctaPrimary: "INNOVAR MI OFERTA",
        },
        product: {
            title: "No vendas M², vende Pertenencia",
            description: [
                "El mercado ha cambiado. El comprador actual no solo busca dónde dormir, busca a dónde ir.",
                "Freedom Lifestyle Key™ no es un simple agregado; es una credencial de ciudadano global para clientes que exigen lo extraordinario.",
            ],
        },
        benefits: {
            b1: {
                title: "Diferenciación Real",
                text: "Sal del océano rojo de las comparaciones físicas convencionales.",
            },
            b2: {
                title: "Valor de Marca",
                text: "Asocia tu desarrollo con el lujo, la libertad y el acceso exclusivo.",
            },
            b3: {
                title: "Fidelización",
                text: "Tus clientes recordarán tu firma cada vez que abran una puerta en el mundo.",
            },
        },
    },
    B: {
        hero: {
            tagline: "ACELERADOR COMERCIAL",
            headline: "Convierte la Objeción en <span class='animate-shine text-gold-gradient italic'>Oportunidad.</span>",
            subtext: "Protege tus márgenes ofreciendo un activo de valor percibido superior al descuento tradicional.",
            ctaPrimary: "ACELERAR CIERRES"
        },
        product: {
            title: "El Cierre Perfecto",
            description: [
                "En un mercado saturado, el precio es el último refugio de quien no tiene valor.",
                "Otorga un activo inmobiliario que se paga solo con el disfrute de tu cliente."
            ]
        },
        benefits: {
            b1: { title: "Velocidad de Absorción", text: "Reduce drásticamente el ciclo de decisión del comprador." },
            b2: { title: "Protección de Margen", text: "Es mucho más rentable que bajar un 5% el precio de lista." },
            b3: { title: "Arma de Ventas", text: "Empodera a tus vendedores con un argumento emocional imbatible." }
        }
    },
    C: {
        hero: {
            tagline: "ESTILO DE VIDA SIN LÍMITES",
            headline: "Que su Inversión no frene sus <span class='animate-shine text-gold-gradient italic'>Viajes.</span>",
            subtext: "Dales la seguridad de un hogar de lujo y la libertad de explorar el mundo entero.",
            ctaPrimary: "VERIFICAR DISPONIBILIDAD"
        },
        product: {
            title: "La Libertad de Tenerlo Todo",
            description: [
                "Tus clientes temen que una casa los 'ate' a un destino.",
                "Con FLK™, su inversión es el punto de partida hacia un millón de destinos."
            ]
        },
        benefits: {
            b1: { title: "Conexión Emocional", text: "Ataca el deseo real de libertad y estatus internacional." },
            b2: { title: "Justificación Racional", text: "El ahorro acumulado en viajes justifica la inversión inicial." },
            b3: { title: "Embajadores de Marca", text: "Un cliente que viaja feliz por el mundo es tu mejor publicidad." }
        }
    },
    D: {
        hero: {
            tagline: "MI NARRATIVA PERSONALIZADA",
            headline: "Tu Visión, <span class='animate-shine text-gold-gradient italic'>Tu Marca.</span>",
            subtext: "Personaliza el mensaje para cada tipo de inversionista y cierra con elegancia.",
            ctaPrimary: "DEFINIR MENSAJE"
        },
        product: {
            title: "Control Total de Marca",
            description: [
                "Adapta tu propuesta de valor en tiempo real.",
                "Freedom Lifestyle Key™ se adapta a tu estrategia comercial sin fisuras."
            ]
        },
        benefits: {
            b1: { title: "Adaptabilidad", text: "Configura el discurso según el perfil del inversor." },
            b2: { title: "Exclusividad", text: "Muestra solo lo que tu cliente más valora." },
            b3: { title: "Impacto", text: "Un mensaje potente genera resultados inmediatos." }
        }
    }
};
