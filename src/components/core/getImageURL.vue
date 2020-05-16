<script>
import axios from "axios";

export async function getImageURL(imgUrl, id) {
  return axios
    .get(`/api/games/${id}/iamge`)
    .then(res => {
      imgUrl = res.imgUrl;
    })
    .catch(e => {
      alert(e);
    });
}
</script>
