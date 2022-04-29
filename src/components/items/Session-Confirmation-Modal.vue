<script lang="ts">
import {ref, defineComponent} from "vue";
import axios from 'axios'

const api = 'http://localhost:8000/api/'
const session = ref ({
    'id_subject' : '',
    'description' : '',
    'date' : '',
    'id_tutor' : '',
    'id_student' : '',
    'file' : '',
    'status' : 0,
    'spot' : '',
    'request_time' : '',
    'verify_time' : null,
    'id_admin_verify' : null,

})

export default defineComponent({
    data() {
        return {
            newSession : session
        }
    },
    methods: {
        postSession() {
            var headers = {"Content-Type" : "application/json"}
            axios
            .post(api+'sessions/, newSession, headers')
            .then(result => {
                console.log(result.data)
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
})

</script>