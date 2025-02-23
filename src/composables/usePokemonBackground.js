import { computed } from 'vue';

export function usePokemonBackground(pokemon) {
    const typeColorHex = {
        Feu: '#F08030',
        Eau: '#6890F0',
        Plante: '#78C850',
        Électrik: '#F8D030',
        Insecte: '#A8B820',
        Roche: '#B8A038',
        Sol: '#E0C068',
        Combat: '#C03028',
        Spectre: '#705898',
        Psy: '#F85888',
        Ténèbres: '#705848',
        Dragon: '#7038F8',
        Acier: '#B8B8D0',
        Vol: '#ADD8E6',
        Poison: '#A040A0',
        Glace: '#98D8D8',
        Fée: '#EE99AC',
        Normal: '#A8A878'
    };

    const backgroundStyle = computed(() => {
        if (!pokemon.value || !pokemon.value.types?.length) {
            return { backgroundColor: typeColorHex.Normal };
        }

        const types = pokemon.value.types.map(t => t.name);

        if (types.length === 1) {
            return { backgroundColor: typeColorHex[types[0]] || typeColorHex.Normal };
        }

        return {
            background: `linear-gradient(135deg, ${typeColorHex[types[0]] || typeColorHex.Normal}, ${typeColorHex[types[1]] || typeColorHex.Normal})`
        };
    });

    return { backgroundStyle };
}
