import React from 'react';
import { Card,Button,Icon, Label,Image} from 'semantic-ui-react';
// import {Link} from 'react-router-dom';
import moment from 'moment';

function PostCard({
    post: {imgUrl,body,createdAt,id, username,likeCount,commentCount,likes}
}) {
    function likePost(){
        console.log('Like post');
    }
    function commentOnPost(){
        console.log('commentOnPost');
    }
    return(
        <Card fluid >
            <Card.Content style={{marginLeft:150 }}>
                <Card.Header>
                    <Image floated="left" size="mini" src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" />
                    {username}
                </Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Image src={imgUrl} style={{ width: 800, height:500 }}/>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra style={{marginLeft:150 }}>
                <Button as="div" labelPosition="right" onClick={likePost} >
                    <Button color="teal" basic>
                        <Icon name="heart"/>
                    </Button>
                    <Label basic color="teal" pointing="left">
                        {likeCount}
                    </Label>
                </Button>
                <Button as="div" labelPosition="right" onClick={commentOnPost} >
                    <Button color="blue" basic>
                        <Icon name="comments"/>
                    </Button>
                    <Label basic color="blue" pointing="left">
                        {commentCount}
                    </Label>
                </Button>
            </Card.Content>
        </Card>
        
    );
}

export default PostCard