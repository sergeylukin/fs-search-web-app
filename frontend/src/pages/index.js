/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { Link, graphql } from "gatsby"
import { Button, Label, Input, Flex, Styled, Text, jsx, Grid, Box } from "theme-ui"
import axios from 'axios'

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const { gatsbyBackendURL } = data.site.siteMetadata
  const [searchQuery, setSearchQuery] = useState('/etc/passwd')
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState([])

  const performSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery) return false;

    try {
      setIsLoading(true)
      setErrorMsg('')
      if (searchQuery === '/etc/passwd') {
        setErrorMsg("Are you serious? I pass... Try something else please, do me a favor!")
        setIsLoading(false)
      } else {
        const url = `${gatsbyBackendURL}/search/?_q=${searchQuery}`
        const res = await axios.get(url)
        setResults(res.data.data)
        setIsLoading(false)
      }
    } catch (err) {
      setErrorMsg("Hmm, seems like no such file found... Maybe try `**`?")
      setResults([])
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <SEO title="Searching for my job of dream..." />
      <Label sx={{ fontWeight: 'bold', fontSize: 2, }}>Search for your favorite file of the day:</Label>
      <form onSubmit={performSearch}>
        <Flex mt={2}
          sx={{
            flexDirection: ['column', null, 'row', null],
            alignItems: 'stretch',
          }}>
          <Box
            sx={{
              flexGrow: '2',
              pr: [0, null, 3, null],
            }}
            >
            <Input
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value)
              }}
              sx={{
                width: '100%',
              }}
            />
          </Box>
          <Box
            sx={{
              mt: [2, null, 0, null],
              textAlign: ['center', null, 'left', null],
            }}
            >
            <Button variant={searchQuery ? "primary" : "disabled"}
              type="submit"
              sx={{
                width: ['100%', null, 'auto', null],
                height: '100%'
              }}>Search</Button>
          </Box>
        </Flex>
      </form>
      <Flex pt={4}
        sx={{
          alignItems: 'center',
          justifyContent: 'center'
        }}
        >
        { errorMsg && <p>{errorMsg}</p> }
        { isLoading ? <Box sx={{ textAlign: 'center' }}>Fetching...</Box> : (
          <Box>
            {results.length > 0 ? (
              <>
                <p>Yay, found following files by your request:</p>
                {results.map((item, index) => {
                  if (!item) return
                  return (
                    <Grid
                      gap={0}
                      columns={[3, '1fr 5fr 1fr']}
                      key={index}
                      variant="variants.fileRow"
                      >
                      <Box p={3}>{item}</Box>
                    </Grid>
                    )
                })}
                </>
            ) : null}
          </Box>
        )}
      </Flex>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        gatsbyBackendURL
      }
    }
  }
`
