import React, {Component} from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

export default class AboutUs extends Component {
  render() {
    const cardTheme = {
      root: {
        width: '21%',
        height: '25em',
        margin: '2%',
        alignItems: 'center'
      },
      media: {
        height: '100px',
        objectFit: 'cover',
        borderRadius: '50%',
        width: '100px'
      }
    }

    return (
      <div>
        <Grid container style={{padding: '5%'}}>
          <Grid item>
            <Typography variant="h1">About Us</Typography>
            <Typography variant="body1">
              We are Tiger Sugar Balm.
              <br />
              An apothecary founded by four ladies with a passion for making
              people’s lives easier... with a twist.
              <br />
              With potions for every occasion, we’re positive you’ll find
              soemthing for you or a loved one. Take your next step into this
              magical apothecary.
            </Typography>
          </Grid>
          <Grid item container>
            <Typography variant="h1">Meet Our Team</Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
            <Card style={cardTheme.root}>
              <CardActionArea>
                <CardMedia
                  className={cardTheme.media}
                  component="img"
                  src="https://ca.slack-edge.com/T024FPYBQ-U0195NF3ETE-979e82bf50e5-512"
                />
                <CardContent>
                  <Typography variant="body1">Julia Kravets</Typography>
                  <Typography variant="body2">
                    Future link to LinkedIn
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card style={cardTheme.root}>
              <CardActionArea>
                <CardMedia
                  className={cardTheme.media}
                  component="img"
                  src="https://ca.slack-edge.com/T024FPYBQ-U0195NG5EBW-6dd9ee7efd86-512"
                />
                <CardContent>
                  <Typography variant="body1">Lindsey Pak</Typography>
                  <Typography variant="body2">
                    Future link to LinkedIn
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card style={cardTheme.root}>
              <CardActionArea>
                <CardMedia
                  className={cardTheme.media}
                  component="img"
                  src="https://ca.slack-edge.com/T024FPYBQ-U019PC99EQ0-1248eb168c16-512"
                />
                <CardContent>
                  <Typography variant="body1">Priscila Pintado</Typography>
                  <Typography variant="body2">
                    Future link to LinkedIn
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card style={cardTheme.root}>
              <CardActionArea>
                <CardMedia
                  className={cardTheme.media}
                  component="img"
                  src="https://ca.slack-edge.com/T024FPYBQ-U01CGDQ9UBS-62e48fa3b0ff-512"
                />
                <CardContent>
                  <Typography variant="body1">Samantha Shapland</Typography>
                  <Typography variant="body2">
                    Future link to LinkedIn
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}
