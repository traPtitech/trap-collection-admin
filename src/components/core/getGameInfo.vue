<script>
import axios from "axios";

export async function getGameInfo(game, id) {
  return axios
    .get(`/api/games/${id}/info`)
    .then(res => {
      game = res.game;
    })
    .catch(e => {
      alert(e);
    });
}
</script>
