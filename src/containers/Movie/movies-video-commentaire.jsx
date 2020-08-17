<Container >
    {/* ne pas oublier de modifier le CSS de Video si on remet commentaire marginBottom. */}
    <Video id={this.state.youtubeKey}/>
    <Form onSubmit={this.submit} style={{marginTop:"20px"}}>
        <Form.Label>Ajouter un commentaire</Form.Label>
        <Form.Control as="textarea" rows="3" />
        <MyButton />
    </Form>
</Container>