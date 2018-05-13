const store = {
  namespaced: true,
  state: {
    name: "",
    idno: "",
    phone: "",
    type: "",
    department: "",
    jobLevel: "",
    chargeStatus: "",
    select:[],
    unSelect:[]
  },
  getters: {

  },
  mutations: {
    add(state, obj) {
      for(var key in obj){
        state[key] = obj[key];
      }
    },
    pushUnSelect(state, id) {
      if(state.unSelect.indexOf(id)==-1)
        state.unSelect.push(id)
    },
    pullUnSelect(state, id) {
      var index = state.unSelect.indexOf(id);
      if(index!=-1)
        state.unSelect.splice(index,1)
    },
    pushSelect(state, id) {
      if(state.select.indexOf(id)==-1)
        state.select.push(id)
    },
    pullSelect(state, id) {
      var index = state.select.indexOf(id);
      if(index!=-1)
        state.select.splice(index,1)
    },
  },
  actions: {
    add(context, obj) {
      context.commit('add', obj)
    },
    pushUnSelect(context, id) {
      context.commit('pushUnSelect', id)
    },
    pullUnSelect(context, id) {
      context.commit('pullUnSelect', id)
    },
    pushSelect(context, id) {
      context.commit('pushSelect', id)
    },
    pullSelect(context, id) {
      context.commit('pullSelect', id)
    },
  }
}

export default store
