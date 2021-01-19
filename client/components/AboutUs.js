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
        height: '350px',
        margin: '2%',
        alignItems: 'center'
      },
      media: {
        height: '100px'
      }
    }

    return (
      <div>

        <Grid container style={{padding: '5%'}}>
          <Grid item>
            <Typography variant="h1">ABOUT US</Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </Grid>
          <Grid item container>
            <Typography variant="h1">CREATORS</Typography>
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
