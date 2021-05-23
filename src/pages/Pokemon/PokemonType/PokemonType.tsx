import { useQuery } from '@apollo/client'
import { Container, Row, Card } from 'react-bootstrap'
import { QUERY_POKEMON_TYPE } from '../../../adapters/queries/pokemon.query'
import { PokemonTypeInterface } from '../../../interfaces/pokemon.interface'
import Skeleton from 'react-loading-skeleton'

const PokemonType = (props: PokemonTypeInterface) => {
  const { loading, error, data } = useQuery(QUERY_POKEMON_TYPE, {
    variables: {
      name: props.pokemon.name,
    },
  })

  if (loading) {
    return (
      <Card className="pokemon-card">
        <Card.Body style={{}}>
          <Skeleton count={5} />
        </Card.Body>
      </Card>
    )
  }
  if (error) return <p>Error :(</p>

  const cardColor = () => {
    switch (data.pokemon.types[0].type.name) {
      case 'grass':
      case 'bug':
        return {
          background: '#3cb371',
        }
      case 'fire':
        return {
          background: '#cd5c5c',
        }
      case 'water':
        return {
          background: '#87ceeb',
        }
      case 'electric':
        return {
          background: '#e2e24e',
        }
      case 'poison':
        return {
          background: '#9370db',
        }
      case 'normal':
        return {
          background: '#5f9ea0',
        }
      case 'fairy':
        return {
          background: '#ff69b4',
        }
      case 'ground':
        return {
          background: '#8b4513',
        }
      default:
        return {
          background: '#5f9ea0',
        }
    }
  }

  return (
    <Card className="pokemon-card">
      <Card.Body style={cardColor()}>
        <label htmlFor="pokemonName" className="pokemon-name">
          {props.pokemon.name}
        </label>
        {data.pokemon.types.map((pokemonType: any, index: number) => (
          <Container key={index} style={{ marginTop: '5px' }}>
            <Row>
              <span className="badge badge-pill pokemon-types">{pokemonType.type.name}</span>
            </Row>
          </Container>
        ))}
        <Card.Img
          className="pokemon-image"
          variant="top"
          src={props.pokemon.image}
          alt="pokemon.png"
        />
      </Card.Body>
    </Card>
  )
}

export default PokemonType
