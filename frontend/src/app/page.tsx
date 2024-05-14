import styles from "./page.module.css";
import { Container, Grid } from "@mui/material";
import { CountryWithFlag } from "@/types";

// get the given number of random countries from backend API
async function getRandomCountries(limit: number) {
    const res = await fetch(process.env.SERVER + "/api/countries/random/?limit=" + limit);

    if (!res.ok) {
        // Recommendation: handle errors
        // This will activate the closest `error.js` Error Boundary
       throw new Error("Failed to fetch countries");
    }
    const json = await res.json();
    const countries = json.data as CountryWithFlag[];
    return countries.map(country => ({...country, flagImg: country.flag.svgLink}));

    //temp data hardcoded for testing

    // return [
    //   {
    //     name: 'Australia',
    //     capital: 'Canberra',
    //     region: 'Oceania',
    //     subregion: 'Australia and New Zealand',
    //     flagImg: 'https://flagcdn.com/au.svg',
    //     population: 25687041,
    //     area: 7692024
    //   }
    // ]
}

// display homepage content
export default async function Home() {

  const sections = [
      {
          title: "Discover your next destination",
          button1: { text: "Discover", link: "/discover" },
          description: (
              <>
                  <p>Browse and filter through hundreds of countries to find your next dream destination. 
                    Travel the world from your own home by searching and discovering
                    both little-known and major countries and learning interesting facts.
                  </p>
                  <p>Build up your knowledge and find your new ultimate wishlist of travel locations.</p>
              </>
          ),
      },
      {
        title: "Be surprised by a random country",
        button1: { text: "Surprise", link: "/surprise" },
        description: (
            <>
                <p>Can't decide where to travel, or not even sure what the possibilities are?</p>
                <p>Let our comprehensive list surprise you with a randomly chosen country. Learn all about
                  where it is and what's it's like, then add it to your list if you like what you see!
                </p>
            </>
        ),
      },     
      {
        title: "Share your travel experiences",
        button1: { text: "Connect", link: "/connect" },
        description: (
            <>
                <p>Have you travelled to some amazing countries, or maybe want to share experiences from your home country?</p>
                <p>Read stories and comments from around the world, or ask questions to find more about what it's like to live
                  and travel in your favourite destinations.
                </p>
            </>
        ),
      },      
      {
        title: "Challenge your memory and knowledge",
        button1: { text: "Challenge", link: "/challenge" },
        description: (
            <>
                <p>Think your geographical knowledge is pretty good? Challenge yourself in our neverending quiz!</p>
                <p>Test your memory on flags, regions and capital cities of countries all around the globe and
                  try to beat your streak and challenge yourself against our top players.
                </p>
            </>
        ),
      },          
  ];
  const countries = await getRandomCountries(sections.length);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Container maxWidth="xl">
          <Grid container columnSpacing={5}>
            <Grid item md={6} xs={12}>
                <CalloutModule title="Discover your next destination" button1={{text: "Discover", link:'/discover'}}>
                  <p>Browse and filter through hundreds of countries to find your next dream destination.
                    Travel the world from your own home by searching and discovering both little-known and major
                    countries and learning interesting facts. Build up your knowledge and find your new ultimate
                    wishlist of travel locations.
                  </p>
                </CalloutModule>
            </Grid>
            <Grid item md={1} sx={{display: {xs: "none", md: "flex"}}}></Grid>
            <Grid item md={5} xs={12}>
              <CountryCard 
                name={countries[0].name} capital={countries[0].capital} 
                region={countries[0].region} subregion={countries[0].subregion} 
                flagImg={countries[0].flagImg}
                population={countries[0].population} area={countries[0].area}/>
            </Grid>
          </Grid>
        </Container>
      </div>
    </main>
  );
}
