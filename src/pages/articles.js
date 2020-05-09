import { graphql, Link } from "gatsby";
import { Box, Image } from "grommet";
import React from "react";
import styled from "styled-components";
import Layout from "../components/layout";
import { Tags } from "../components/tags/tags";

const Grid = styled.div`
    display: grid;
    grid-gap: 20px;
    margin: 6vh 0;

    & div {
        height: 330px;
    }

    @media (min-width: 600px) {
        grid-template-columns: repeat(10, 1fr);

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
    }
`;

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

export const PostItem = ({ fields, frontmatter, excerpt }) => (
    <Box
        elevation="medium"
        pad="medium"
        style={{
            background: "white"
        }}
    >
        <PostHeader>
            <StyledLink to={`/posts${fields.slug}`}>
                <PostTitle> {frontmatter.title} </PostTitle>
            </StyledLink>
            <span
                style={{
                    color: "#bbb"
                }}
            >
                {frontmatter.date && `—${frontmatter.date}`}
            </span>
        </PostHeader>
        {frontmatter.image ? (
            <Image src={frontmatter.image} fit="cover" />
        ) : (
            <p> {frontmatter.description || excerpt} </p>
        )}
    </Box>
);

export default ({ data: { allMdx } }) => (
    <Layout>
        <h1>Articulos</h1>
        <Box margin="small">
            <Tags />
        </Box>
        <Posts posts={allMdx.edges} />
    </Layout>
);

export const Posts = ({ posts }) => (
    <Grid>
        {posts.map(({ node }) => (
            <PostItem key={node.id} {...node} />
        ))}
    </Grid>
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
                    ...PostInfo
                }
            }
        }
    }
`;
