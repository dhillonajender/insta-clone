import React, { useContext } from 'react';
// import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard.js';
// import PostForm from '../components/PostForm';
// import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home(){
    let posts = "";
    const {loading, data, error} = useQuery(FETCH_POSTS_QUERY);
    if (data){
        console.log(data);
        posts = data.getPosts;
        // const { getPosts: posts } = data; 
    }
    if(error) {
        console.log(error);
        return "error"; // blocks rendering
      }
    return(
        <Grid columns={1}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
            {console.log("outside")}
                { loading && <h1>Loading posts..</h1>}
                {data && (
                    <Transition.Group>
                        {posts &&
                        posts.map((post) => (
                        <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                        <PostCard post={post} />
                        </Grid.Column>
                    ))}   
                    </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
    );
}

const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
            id 
            imgUrl
            body
            createdAt 
            username 
            likeCount
            likes{
                username
            }
            commentCount
            comments{
                id 
                username 
                createdAt 
                body
            }
        }
    }
`;
export default Home;