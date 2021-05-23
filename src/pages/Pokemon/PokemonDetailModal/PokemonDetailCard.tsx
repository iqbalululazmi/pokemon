import { QUERY_POKEMON_DETAIL } from '../../../adapters/queries/pokemon.query'
import { Card, Col, Row, Tab, Tabs } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
import React from 'react'
import Loader from 'react-loader-spinner'
import { PokemonDetailContext } from '../../../contexts/pokemon.context'
import './PokemonDetailModal.scss'

const PokemonDetailCard = (props: any) => {
  const [key, setKey] = React.useState<null | string>('about')
  const useDetailContext = React.useContext(PokemonDetailContext)

  const { loading, error, data } = useQuery(QUERY_POKEMON_DETAIL, {
    variables: {
      name: props.pokemon.name,
    },
  })

  if (loading)
    return (
      <div className="spinner">
        <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />;
      </div>
    )

  if (error) return <p>Error :(</p>

  if (Object.keys(data.pokemon).length > 0) {
    useDetailContext.getFromChild(data.pokemon)
  }

  const { pokemon } = data
  const { abilities, sprites, stats, moves } = pokemon

  return (
    <>
      <Tabs className="poke-detail-tab" activeKey={key} onSelect={(k) => setKey(k)}>
        <Tab eventKey="about" title="About">
          <Card className="poke-detail-card">
            <Card.Body>
              <Row>
                <Col>
                  <h6>Weight</h6>
                  <p>{pokemon.weight} Kg</p>
                </Col>
                <Col>
                  <h6>Height</h6>
                  <p>{pokemon.height} cm</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="poke-detail-card">
            <Card.Body>
              <Card.Title>Ability</Card.Title>
              <>
                {abilities?.map((ability: any, index: number) => (
                  <Row key={index}>
                    <Col>
                      <h6>- {ability?.ability.name}</h6>
                    </Col>
                  </Row>
                ))}
              </>
            </Card.Body>
          </Card>
          <Card className="poke-detail-card">
            <Card.Body className="poke-sprite">
              <>
                <h5>Male</h5>
                <Row>
                  <Col>
                    <img src={sprites.front_default} alt="" />
                  </Col>
                  <Col>
                    <img src={sprites.back_default} alt="" />
                  </Col>
                  <Col>
                    <img src={sprites.front_shiny} alt="" />
                  </Col>
                  <Col>
                    <img src={sprites.back_shiny} alt="" />
                  </Col>
                </Row>
                {sprites.front_female !== null && (
                  <>
                    <h5>Female</h5>
                    <Row>
                      <Col>
                        <img src={sprites.front_female} alt="" />
                      </Col>
                      <Col>
                        <img src={sprites.back_female} alt="" />
                      </Col>
                      <Col>
                        <img src={sprites.front_shiny_female} alt="" />
                      </Col>
                      <Col>
                        <img src={sprites.back_shiny_female} alt="" />
                      </Col>
                    </Row>
                  </>
                )}
              </>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="stat" title="Base Stat">
          <Card className="poke-detail-card">
            <Card.Body>
              <>
                {stats?.map((stat: any, index: number) => (
                  <Row key={index}>
                    <Col sm={6} md={6} xs={5}>
                      <h6>{stat?.stat.name}</h6>
                    </Col>
                    <Col>
                      <h6>: {stat?.base_stat}</h6>
                    </Col>
                  </Row>
                ))}
              </>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="moves" title="Moves">
          <Card className="poke-detail-card">
            <Card.Body>
              <>
                {moves?.map((move: any, index: number) => (
                  <Row
                    key={index}
                    style={{ marginBottom: '30px', borderBottom: '1px solid lightgrey' }}
                  >
                    <Col xs={4}>
                      <h6>Move Name</h6>
                    </Col>
                    <Col xs={6}>
                      <h6 style={{ color: '#28a745' }}>: {move?.move.name}</h6>
                    </Col>
                    <Col xs={12}>
                      <Row style={{ marginBottom: '10px', borderBottom: '1px solid lightgrey' }}>
                        <Col xs={4}>
                          <h6>Group</h6>
                        </Col>
                        <Col xs={4}>
                          <h6>Method</h6>
                        </Col>
                        <Col xs={4}>
                          <h6>Start Level</h6>
                        </Col>
                      </Row>
                      {move.version_group_details.map((detail: any, indexMove: number) => (
                        <Row key={indexMove}>
                          <Col xs={4}>
                            <h6>{detail?.version_group.name}</h6>
                          </Col>
                          <Col xs={4}>
                            <h6>{detail?.move_learn_method.name}</h6>
                          </Col>
                          <Col xs={4}>
                            <h6>{detail?.level_learned_at}</h6>
                          </Col>
                        </Row>
                      ))}
                    </Col>
                  </Row>
                ))}
              </>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </>
  )
}

export default PokemonDetailCard
