const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.static('static'));
const cors=require('cors');
const {open}=require('sqlite')
const sqlite3=require('sqlite3').verbose();
let db;
(async ()=>{
  db=await open({
    filename:'./database.sqlite',
    driver:sqlite3.Database,
  });
})();
async function fetchAllGames(){
  let query="SELECT * FROM games"
  let response=await db.all(query,[])
  return ({games:response})
}
app.get('/games',async (req,res)=>{
  try{
    let results=await fetchAllGames();
    if(results.games.length===0){
      res.status(404).json({message:"No games found"})
    }
    res.status(200).json(results);
  }catch(err){
    res.status(500).json({error:err.message});
  }

})
async function fetchGamesById(id){
  let query="SELECT * FROM games WHERE id=?"
  let response=await db.all(query,[id])
  return ({games:response})
}

app.get('/games/details/:id',async (req,res)=>{
  try{
    let id=req.params.id;
    let results=await fetchGamesById(id);
    if(results.games.length===0){
      res.status(404).json({message:"No games found"})
    }
    res.status(200).json(results);

  }catch(err){
    res.status(500).json({error:err.message});
  }
  
})
async function fetchByGenre(genre){
  let query="SELECT * FROM games WHERE genre=?"
  let response=await db.all(query,[genre])
  return ({games:response})
}

app.get('/games/genre/:genre',async (req,res)=>{
  try{
    let genre=req.params.genre;
    let results=await fetchByGenre(genre);
    if(results.games.length===0){
      res.status(404).json({message:"No games found"})
    }
    res.status(200).json(results);

  }catch(err){
    res.status(500).json({error:err.message});
  }
})
async function fetchByPlatform(platform){
  let query="SELECT * FROM games WHERE platform=?"
  let response=await db.all(query,[platform])
  return ({games:response})
}

app.get('/games/platform/:platform',async (req,res)=>{
  try{
    let platform=req.params.platform;
    let results=await fetchByPlatform(platform);
    if(results.games.length===0){
      res.status(404).json({message:"No games found"})
    }
    res.status(200).json(results);

  }catch(err){
    res.status(500).json({error:err.message});
  }
})
async function fetchRatingSorted(){
  let query="SELECT * FROM games ORDER BY rating DESC"
  let response=await db.all(query,[])
  return ({games:response})
}
app.get('/games/sort-by-rating',async (req,res)=>{
  try{
    let results=await fetchRatingSorted()
    if(results.games.length===0){
      res.status(404).json({message:"No games found"})
    }
    res.status(200).json(results);
  }catch(err){
    res.status(500).json({error:err.message});
  }
})
async function fetchAllPlayers(){
  let query="SELECT * FROM players"
  let response=await db.all(query,[])
  return ({players:response})
}
app.get('/players',async (req,res)=>{
  try{
    let results=await fetchAllPlayers();
    if(results.players.length===0){
      res.status(404).json({message:"No players found"})
    }
    res.status(200).json(results);
  }catch(err){
    res.status(500).json({error:err.message});
  }
})
async function fetchPlayersById(id){
  let query="SELECT * FROM players WHERE id=?"
  let response=await db.all(query,[id])
  return ({players:response})
}
app.get('/players/details/:id',async (req,res)=>{
  try{
  let id=req.params.id;
  let results=await fetchPlayersById(id);
  if(results.players.length===0){
    res.status(404).json({message:"No players found"})
  }
  res.status(200).json(results);
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
})
async function fetchPlayersByPlatform(platform){
  let query="SELECT * FROM players WHERE platform=?"
  let response=await db.all(query,[platform])
  return ({players:response})
}
app.get('/players/platform/:platform',async (req,res)=>{
  try{
  let platform=req.params.platform;
  let results=await fetchPlayersByPlatform(platform);
  if(results.players.length===0){
    res.status(404).json({message:"No players found"})
  }
  res.status(200).json(results);
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
})
async function fetchRatingSorted(){
  let query="SELECT * FROM players ORDER BY rating DESC"
  let response=await db.all(query,[])
  return ({players:response})
}
app.get('/players/sort-by-rating',async (req,res)=>{
  try{
    let results=await fetchRatingSorted()
    if(results.players.length===0){
      res.status(404).json({message:"No players found"})
    }
    res.status(200).json(results);
  }catch(err){
    res.status(500).json({error:err.message});
  }
})
async function fetchAllTournaments(){
  let query="SELECT * FROM tournaments"
  let response=await db.all(query,[])
  return ({tournaments:response})
}
app.get('/tournaments',async (req,res)=>{
  try{
    let results=await fetchAllTournaments();
    if(results.tournaments.length===0){
      res.status(404).json({message:"No tournaments found"})
    }
    res.status(200).json(results);
  }catch(err){
    res.status(500).json({error:err.message});
  }
})
async function fetchTournamentsById(id){
  let query="SELECT * FROM tournaments WHERE id=?"
  let response=await db.all(query,[id])
  return ({tournaments:response})
}
app.get('/tournaments/details/:id',async (req,res)=>{
  try{
  let id=req.params.id;
  let results=await fetchTournamentsById(id);
  if(results.tournaments.length===0){
    res.status(404).json({message:"No tournaments found"})
  }
  res.status(200).json(results);
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
})
async function fetchTournamentsByGameId(gameId){
  let query="SELECT * FROM tournaments WHERE gameId=?"
  let response=await db.all(query,[gameId])
  return ({tournaments:response})
}
app.get('/tournaments/game/:gameId',async (req,res)=>{
  try{
  let gameId=req.params.gameId;
  let results=await fetchTournamentsByGameId(gameId);
  if(results.tournaments.length===0){
    res.status(404).json({message:"No tournaments found"})
  }
  res.status(200).json(results);
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
})
async function fetchTournamentsByRating() {
  let query = 'SELECT * FROM tournaments ORDER BY prizePool DESC ';
  let response = await db.all(query, []);
  return { tournaments: response };
}
app.get('/tournaments/sort-by-prize-pool', async (req, res) => {
  try {
    let result = await fetchTournamentsByRating();
    if (result.tournaments.length === 0) {
      return res.status(404).json({ message: 'no tournaments Found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
