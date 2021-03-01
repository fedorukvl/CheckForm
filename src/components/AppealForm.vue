<template>
  <loader v-if="isLoading"></loader>
  <div class="appeal" v-else>
      <h1 class="appeal__title">Форма подачи заявки в отдел сервиса и качества</h1>
      <form 
        class="appeal-form" 
        @submit.prevent="sendAppeal" 
      >
        <fieldset class="appeal-form__field">
            <div class="branch">
                <h3 class="branch__title">Ваш филиал <span title="Это обязательное поле" class="required">*</span></h3>
                <select 
                    class="branch__city-list"
                    :class="{'branch__city-list_isDisabled' : isUserOnline}" 
                    id="user-city"
                    @change="setAppealField({field:'branch',value:$event.target.value})" 
                    :required="!isUserOnline"
                >
                    <option
                     class="branch__city" 
                     value=""
                     :selected="isUserOnline || !branch"
                    >Выберете город</option>
                    <option 
                        v-for="city in cityList"
                        :key="city.id"
                        class="branch__city"
                        :value="city.title"
                    >{{city.title}}</option>
                </select>
                <div class="branch__option">
                    <input 
                        class="branch__option_isOnline" 
                        type="checkbox" 
                        id="online"
                        @click="handleClick"
                    >
                    <label 
                        class="branch__input-label"
                        for="online"
                        :class="{'branch__input-label_isEmpty':!isUserOnline}"
                    >Онлайн</label>
                </div>
            </div>
            <div class="topic">
                <h3 class="topic__title">Тема обращения <span title="Это обязательное поле" class="required">*</span></h3>
                <div class="topic__reasons-list">
                    <div class="topic__reason">
                        <input
                            :required="!isOtherReasonSelected"
                            id="quality" 
                            type="radio" 
                            name="topic"
                            class="topic__reason_isQuality"
                            value="Недоволен качеством услуг"
                            @click="handleChoice"
                        >
                        <label 
                            class="topic__input-label"
                            :class="{'topic__input-label_isEmpty':isOtherReasonSelected}" 
                            for="quality"
                        >Недоволен качеством услуг</label>
                    </div>
                    <div class="topic__reason">
                        <input
                            :required="!isOtherReasonSelected"
                            id="agreement" 
                            type="radio" 
                            name="topic" 
                            class="topic__reason_isAgreement"
                            value="Расторжение договора"
                            @click="handleChoice"
                        >
                        <label 
                            class="topic__input-label"
                            :class="{'topic__input-label_isEmpty':isOtherReasonSelected}" 
                            for="agreement"
                        >Расторжение договора</label>
                    </div>
                    <div class="topic__reason">
                        <input
                            :required="!isOtherReasonSelected"
                            id="letter" 
                            type="radio" 
                            name="topic"
                            class="topic__reason_isLetter"
                            value="Не приходит письмо активации на почту"
                            @click="handleChoice"
                        >
                        <label 
                            class="topic__input-label" 
                            for="letter"
                            :class="{'topic__input-label_isEmpty':isOtherReasonSelected}"
                        >Не приходит письмо активации на почту</label>
                    </div>
                    <div class="topic__reason">
                        <input
                            :required="!isOtherReasonSelected"
                            id="user-area" 
                            type="radio" 
                            name="topic"
                            class="topic__reason_isUserArea"
                            value="Не работает личный кабинет"
                            @click="handleChoice"
                        >
                        <label 
                            class="topic__input-label" 
                            for="user-area"
                            :class="{'topic__input-label_isEmpty':isOtherReasonSelected}"
                        >Не работает личный кабинет</label>
                    </div>
                    <div class="topic__reason">
                        <input
                            class="topic__reason_isAnother"
                            placeholder="Другое"
                            :value="anotherReason"
                            @input="handleChange"
                            type="text"
                        >
                    </div>
                </div>
            </div>
            <div class="problem-description">
                <h3 class="problem-description__title">Описание пробемы <span title="Это обязательное поле" class="required">*</span></h3>
                <textarea
                    required
                    wrap="soft"
                    class="problem-description__reason"
                    placeholder="Введите текст"
                    id="problem-description"
                    :value="problemDescription"
                    @change="setAppealField({field:'problemDescription',value:$event.target.value})"
                ></textarea>
            </div>
            <div class="file-loading">
                <h3 class="file-loading__title">Загрузка документов</h3>
                <p class="file-loading__hint">
                    <span>Приложите, пожалуйста, полноэкранный скриншот.</span>
                    <br/>
                    <span>Это поможет быстрее решить проблему</span>
                </p>
                <input 
                    class="file-loading__load" 
                    type="file"
                    ref="fileLoading"
                    @change="setAppealField({field:'loadedFile',value:$event.target.files})"
                >
            </div>
            <button 
                class="appeal-form__submit"
                :class="{'appeal-form__submit_isDisabled':!isFormCorrect}"
            >Отправить</button>
        </fieldset>
      </form>
  </div>
</template>

<script>
import {mapGetters,mapActions,mapMutations,mapState} from 'vuex';
import Loader from './Loader.vue';

export default {
    name:'AppealForm',
    components:{Loader},
    computed:{
        ...mapState('appeal',{
            branch: (state)=>state.appeal.branch,
            topic: (state)=>state.appeal.topic,
            problemDescription: (state)=>state.appeal.problemDescription,
        }),
        ...mapGetters('appeal',{
            isLoading: 'IS_LOADING',
            isUserOnline: 'IS_ONLINE',
            isOtherReasonSelected: 'IS_OTHER_REASON',
            anotherReason: 'GET_ANOTHER_REASON',
            error: 'GET_ERROR',
            cityList: 'GET_CITY_LIST',
        }),
        isFormCorrect(){
          if((this.branch.length || this.isUserOnline) && this.topic.length && this.problemDescription.length){
            return true;
          }else{
            return false;
          }  
        },
    },
    methods:{
        ...mapActions('appeal',{
            fetchCities: 'FETCH_CITIES',
            sendData: 'SEND_DATA',
        }),
        ...mapMutations('appeal',{
            setAppealField: 'SET_APPEAL_FIELD',
            setAnotherReason: 'SET_ANOTHER_REASON',
            setDefaultReason: 'UNSET_ANOTHER_REASON',
            toggleUserStatus: 'TOGGLE_USER_STATUS',
        }),
        handleClick(){
            this.setAppealField({field:'isOnline',value:!this.isUserOnline});
            this.toggleUserStatus();
        },
        handleChoice(e){
            this.setAppealField({field:'topic',value:e.target.value});
            this.setDefaultReason();
        },
        handleChange(e){
            this.setAppealField({field:'topic',value:e.target.value});
            this.setAnotherReason(e.target.value);
        },
        sendAppeal(){
            this.sendData().finally(()=>this.$refs.fileLoading.value=null);
        }
    },
    created(){
        this.fetchCities();
    },
}
</script>
<style lang="sass" src="@/media/sass/components/AppealForm.sass" scoped></style>
