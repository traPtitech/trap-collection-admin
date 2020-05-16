<script>
import axios from "axios";

export async function getImageURL(videoUrl, id) {
  return axios
    .get(`/api/games/${id}/video`)
    .then(res => {
      videoUrl = res.videoUrl;
    })
    .catch(e => {
      alert(e);
    });
}
</script>
