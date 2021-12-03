import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes:{
            light:{
                primary: "#EDCA00",
                plight: "#F6ED91",
                secondary: "#0024ED",
                slight: "#4930fc",
                sdark: "#000ee2",
            }
        }
    }
});
