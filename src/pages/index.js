import React from "react";
import styled from "styled-components";
import Layout from "../components/layout";
import { graphql, Link } from "gatsby";
import { Heading, Box, Button, Image } from "grommet";

const PostHeader = styled.h3`
  margin-bottom: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const PostTitle = styled.span`
  font-size: 1.5rem;
`;

const Banner = () => (
  <Box
    pad="large"
    align="center"
    gap="medium"
    direction="row-responsive"
    fill="horizontal"
    border="all"
  >
    <Box height="small" width="small" basis="1/4">
      <Image
        fit="contain"
        src="/icon.png"
        alt="Our academy logo"
        style={{ borderRadius: "50%" }}
      />
    </Box>
    <Box basis="auto">
      <Heading size="medium">
        Un lugar donde aprender desarrollo de software
      </Heading>
      <Heading level="3">Para ti, para mi, para todos</Heading>
    </Box>
  </Box>
);

const Postsss = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 5px;

  & div {
    height: 400px;
  }

  & div:nth-child(4n + 1) {
    grid-column: span 6;
  }

  & div:nth-child(4n + 2) {
    grid-column: span 4;
  }
  & div:nth-child(4n + 3) {
    grid-column: span 5;
  }

  & div:nth-child(4n) {
    grid-column: span 5;
  }
`;

export default ({ data }) => (
  <Layout>
    <div>
      <Banner />
      <Heading level="4" size="large">
        <Button label={data.allMdx.totalCount} /> Posts
      </Heading>
      {/* {data.allMdx.edges.map(({ node }) => (
      <PostItem key={node.id} {...node} />
      
      ))} */}
      <Postsss>
        {data.allMdx.edges.map(({ node }) => (
          <PostItem key={node.id} {...node} />
        ))}
      </Postsss>
    </div>
  </Layout>
);

const PostItem = ({ fields, frontmatter, excerpt }) => (
  <Box elevation="medium" pad="medium">
    <PostHeader>
      <StyledLink to={`posts${fields.slug}`}>
        <PostTitle>{frontmatter.title}</PostTitle>
      </StyledLink>{" "}
      <span
        style={{
          color: "#bbb"
        }}
      >
        — {frontmatter.date}
      </span>
    </PostHeader>
    {frontmatter.image ? (
      <Image src={frontmatter.image} fit="cover" />
    ) : (
      <p>{excerpt}</p>
    )}
  </Box>
);

export const query = graphql`
  query {
    allMdx(
      filter: { fields: { isPublic: { eq: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            image
          }
          excerpt
        }
      }
    }
  }
`;
