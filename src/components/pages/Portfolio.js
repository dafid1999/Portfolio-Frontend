import React, {useCallback, useEffect, useState} from "react";
import {AppBar, Box, Button, Card, CardContent, CardMedia, IconButton, Stack, Toolbar, Typography} from "@mui/material";
import {useParams} from "react-router";
import {BaseUrl} from "../../services/ApiCalls";
import {Image} from "react-bootstrap";
import logo from "../../images/Logo_2.png"

const BoxWithBackgroundImage = ({url, id, children}) => {
  return (
    <Box
      id={id}
      style={{
        backgroundImage: `url("${url}")`,
        height: '100vh',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  )
}



const Portfolio = () => {
  const portfolio = useParams()
  const [portfolioName, setPortfolioName] = useState("");
  const [portfolioId, setPortfolioId] = useState();
  const [views, setViews] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isViewsPatched, setIsViewsPatched] = useState(false);
  const [isTrescLoading, setIsTrescLoading] = useState(true);
  const [isZdjeciaLoading, setIsZdjeciaLoading] = useState(true);
  const [isFilmyLoading, setIsFilmyLoading] = useState(true);

  const [trescList, setTrescList] = useState([
    { id: 1, name: "Tytuł strony", content: "" },
    { id: 2, name: "Tekst o mnie", content: "" },
    { id: 3, name: "Tytuł pierwszego zdjecia", content: "" },
    { id: 4, name: "Opis pierwszego zdjecia", content: "" },
    { id: 5, name: "Tytuł drugiego zdjecia", content: "" },
    { id: 6, name: "Opis drugiego zdjecia", content: "" },
    { id: 7, name: "Tytuł trzeciego zdjecia", content: "" },
    { id: 8, name: "Opis trzeciego zdjecia", content: "" },
    { id: 9, name: "Opis filmu", content: "" },
    { id: 10, name: "Email do kontaktu", content: "" },
  ]);

  const [filmyList, setFilmyList] = useState([
    { id: 1, name: "Film", url: "" },
  ]);

  const [zdjeciaList, setZdjeciaList] = useState([
    { id: 1, name: "Logo", url: "" },
    { id: 2, name: "Pierwsze tło", url: "" },
    { id: 3, name: "Drugie tło", url: "" },
    { id: 4, name: "Trzecie tło", url: "" },
    { id: 5, name: "Pierwsze zdjecie", url: "" },
    { id: 6, name: "Drugie zdjecie", url: "" },
    { id: 7, name: "Trzecie zdjecie", url: "" },
  ]);

  const GetPortfolioId = useCallback(async () => {
    await fetch("".concat(`${BaseUrl}`, 'portfolio/portfolio/'), {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
        .then((r) => {
          return r.json();
        })
        .then((r) => {
          let temp = r.filter((object) => portfolioName === object.portfolioName)
          setPortfolioId(temp[0].id);
          setViews(temp[0].wyswietlenia);
        })
  }, [portfolioName]);

  const PatchPortfolioViews = useCallback(async () => {
    await fetch("".concat(`${BaseUrl}`, 'portfolio/portfolio/', `${portfolioId}`,'/'), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({wyswietlenia: views}, null, 2)
    })
  }, [portfolioId, views]);

  const GetPortfolioFilms = useCallback(async () => {
    await fetch("".concat(`${BaseUrl}`, 'portfolio/filmy'), {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
        .then((r) => {
          return r.json();
        })
        .then((r) => {
          let temp = r.filter((object) => portfolioId === object.portfolio)
          let index = 0;
          const newDataList = [...filmyList];
          temp.forEach((film) => {
            if(index < temp.length){
              newDataList[index].url = film.url;
              newDataList[index].id = film.id;
              index++;
            }
          })
          setFilmyList(newDataList);
        })
  }, [portfolioId, filmyList]);

  const GetPortfolioTexts = useCallback(async () => {
    await fetch("".concat(`${BaseUrl}`, 'portfolio/tresc'), {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
        .then((r) => {
          return r.json();
        })
        .then((r) => {
          let temp = r.filter((object) => portfolioId === object.portfolio)
          let index = 0;
          const newDataList = [...trescList];
          temp.forEach((tresc) => {
            if(index < temp.length){
              newDataList[index].content = tresc.tresc;
              newDataList[index].id = tresc.id;
              index++;
            }
          })
          setTrescList(newDataList);
        })
  }, [portfolioId, trescList]);

  const GetPortfolioImages = useCallback(async () => {
    await fetch("".concat(`${BaseUrl}`, 'portfolio/zdjecia'), {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
        .then((r) => {
          return r.json();
        })
        .then((r) => {
          let temp = r.filter((object) => portfolioId === object.portfolio)
          let index = 0;
          const newDataList = [...zdjeciaList];
          temp.forEach((zdjecie) => {
            if(index < temp.length){
              newDataList[index].url = zdjecie.url;
              newDataList[index].id = zdjecie.id;
              index++;
            }
          })
          setZdjeciaList(newDataList);
        })
  }, [portfolioId, zdjeciaList]);


  useEffect(() => {
    setPortfolioName(portfolio.portfolio);
    GetPortfolioId();
    if (portfolioId) {
      GetPortfolioFilms();
      GetPortfolioTexts();
      GetPortfolioImages();
      setIsLoading(false);
    }
  }, [GetPortfolioId, portfolioId])

  useEffect(() => {
    if(isLoading2 && views !== undefined) {
      setIsLoading2(false);
      setViews(views+1);
    }
    if(!isViewsPatched && !isLoading2) {
      setIsViewsPatched(true);
      PatchPortfolioViews();
    }
  }, [views, isLoading2, isViewsPatched]);

  useEffect(() => {
    if(trescList[0].content){
      setIsTrescLoading(false);
    }
  }, [trescList])

  useEffect(() => {
    if(filmyList[0].url){
      setIsFilmyLoading(false);
    }
  }, [filmyList])

  useEffect(() => {
    if(zdjeciaList[0].url){
      setIsZdjeciaLoading(false);
    }
  }, [zdjeciaList])

  if (!isLoading) {
    return (
        <>
          <AppBar position='fixed' color='primary'>
            <Toolbar>
              <IconButton size='small' edge='start' color='inherit' aria-label='logo'>
                {!isZdjeciaLoading ? <Image style={{maxHeight: "60px"}} src={zdjeciaList[0].url} fluid/> : <Image src={logo} fluid/>}
              </IconButton>
              <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                {!isTrescLoading ? trescList[0].content : "tytul"}
              </Typography>
              <Stack direction='row' spacing={2}>
                <Button href='#about' color='inherit'>O MNIE</Button>
                <Button href='#example' color='inherit'>PRZYKŁADY</Button>
                <Button href='#contact' color='inherit'>KONTAKT</Button>
              </Stack>
            </Toolbar>
          </AppBar>
          <BoxWithBackgroundImage id="about" url={!isZdjeciaLoading ? zdjeciaList[1].url : "https://mdbootstrap.com/img/Photos/Horizontal/Nature/full page/img(20).webp"}>
            <Typography variant='h2' mb='5vh' style={{textShadow: "1px 0px 4px #00000060"}}>O mnie</Typography>
            <Typography variant='body1' width='65vh' style={{textShadow: "1px 0px 2px #00000060"}}>
              {!isTrescLoading ? trescList[1].content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices enim lacus, commodo volutpat lacus bibendum in. Quisque at eros maximus, dictum lorem id, hendrerit tellus. Phasellus eu mauris sed nulla blandit euismod ut vel orci. Morbi maximus nam.'}
            </Typography>
          </BoxWithBackgroundImage>
          <BoxWithBackgroundImage id="example" url={!isZdjeciaLoading ? zdjeciaList[2].url : "https://mdbootstrap.com/img/Photos/Horizontal/Nature/full page/img(20).webp"}>
            <Box>
              <Typography variant='h3' mt='7vh' mb='5vh' width='100%' style={{textShadow: "1px 0px 4px #00000060"}}>Przykłady</Typography>
            </Box>
            <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  width: '100%'
                }}
            >
              <Card
                  sx={{
                    width: '50vh',
                    height: '40vh',
                    backgroundColor: '#1976d2',
                  }}
              >
                <CardMedia
                    component="img"
                    height="220vh"
                    image={!isZdjeciaLoading ? zdjeciaList[4].url : 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/full page/img(20).webp'}
                    alt="zdjecie"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {!isTrescLoading ? trescList[2].content : "Tytul 1"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {!isTrescLoading ? trescList[3].content :'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices enim lacus, commodo volutpat lacus bibendum in. Quisque at eros maximus, dictum lorem id, hendrerit tellus. Phasellus eu mauris sed nulla blandit euismod ut vel orci. Morbi maximus nam.'}
                  </Typography>
                </CardContent>
              </Card>
              <Card
                  sx={{
                    width: '50vh',
                    height: '40vh',
                    backgroundColor: '#1976d2',
                  }}
              >
                <CardMedia
                    component="img"
                    height="220vh"
                    image={!isZdjeciaLoading ? zdjeciaList[5].url : 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/full page/img(20).webp'}
                    alt="zdjecie"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {!isTrescLoading ? trescList[4].content : "Tytul 2"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {!isTrescLoading ? trescList[5].content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices enim lacus, commodo volutpat lacus bibendum in. Quisque at eros maximus, dictum lorem id, hendrerit tellus. Phasellus eu mauris sed nulla blandit euismod ut vel orci. Morbi maximus nam.'}
                  </Typography>
                </CardContent>
              </Card>
              <Card
                  sx={{
                    width: '50vh',
                    height: '40vh',
                    backgroundColor: '#1976d2',
                  }}
              >
                <CardMedia
                    component="img"
                    height="220vh"
                    image={!isZdjeciaLoading ? zdjeciaList[6].url : 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/full page/img(20).webp'}
                    alt="zdjecie"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {!isTrescLoading ? trescList[6].content : "Tytul 3"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {!isTrescLoading ? trescList[7].content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices enim lacus, commodo volutpat lacus bibendum in. Quisque at eros maximus, dictum lorem id, hendrerit tellus. Phasellus eu mauris sed nulla blandit euismod ut vel orci. Morbi maximus nam.'}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
              <Box
                  sx={{
                    width: '63.5vh',
                    height: '40vh',
                    backgroundColor: '#1976d2',
                    mt: "1vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
              >
                  <video width="100%" height="100%" src={!isFilmyLoading ? filmyList[0].url : "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"}></video>
                  <Typography gutterBottom variant="h5" component="div">
                    {!isTrescLoading ? trescList[8].content : "Opis filmu"}
                  </Typography>
              </Box>
          </BoxWithBackgroundImage>
          <BoxWithBackgroundImage id="contact" url={!isZdjeciaLoading ? zdjeciaList[3].url : "https://mdbootstrap.com/img/Photos/Horizontal/Nature/full page/img(20).webp"}>
            <Typography variant='h2' mb='5vh' style={{textShadow: "1px 0px 4px #00000060"}}>{'Kontakt'}</Typography>
            <Typography variant='h4' mb='5vh' style={{textShadow: "1px 0px 4px #00000060"}}>{!isTrescLoading ? trescList[9].content :'Email: sample@gmail.com'} </Typography>
          </BoxWithBackgroundImage>
        </>
    );
  }
  ;
}

export default Portfolio;