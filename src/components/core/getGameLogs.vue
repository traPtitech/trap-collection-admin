<script>
import axios from "axios";

export function getGameLogs(logs, id) {
  return axios
    .get(`/api/games/version/${id}`)
    .then(res => {
      logs = res.logs;
    })
    .catch(e => {
      alert(e);
    });
}
</script>
