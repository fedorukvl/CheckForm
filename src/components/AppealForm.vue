<template>
  <div class="appeal">
      <h1 class="appeal__title">Форма подачи заявки в отдел сервиса и качества</h1>
      <form class="appeal-form">
        <fieldset class="appeal-form__field">
            <div class="branch">
                <h3 class="branch__title">Ваш филиал <span class="required">*</span></h3>
                <select class="branch__city-list" id="user-city" required>
                    <option class="branch__city" value="">Выберете город</option>
                </select>
                <div class="branch__option">
                    <input 
                        class="branch__option_isOnline" 
                        type="checkbox" 
                        id="online"
                    >
                    <label class="branch__input-label" for="online">Онлайн</label>
                </div>
            </div>
            <div class="topic">
                <h3 class="topic__title">Тема обращения <span class="required">*</span></h3>
                <div class="topic__reasons-list">
                    <div class="topic__reason">
                        <input
                            required
                            id="quality" 
                            type="radio" 
                            name="topic"
                            class="topic__reason_isQuality"
                            value="Недоволен качеством услуг"
                        >
                        <label class="topic__input-label" for="quality">Недоволен качеством услуг</label>
                    </div>
                    <div class="topic__reason">
                        <input
                            required
                            id="agreement" 
                            type="radio" 
                            name="topic" 
                            class="topic__reason_isAgreement"
                            value="Расторжение договора"
                        >
                        <label class="topic__input-label" for="agreement">Расторжение договора</label>
                    </div>
                    <div class="topic__reason">
                        <input
                            required
                            id="letter" 
                            type="radio" 
                            name="topic"
                            class="topic__reason_isLetter"
                            value="Не приходит письмо активации на почту"
                        >
                        <label class="topic__input-label" for="letter">Не приходит письмо активации на почту</label>
                    </div>
                    <div class="topic__reason">
                        <input
                            required
                            id="user-area" 
                            type="radio" 
                            name="topic"
                            class="topic__reason_isUserArea"
                            value="Не работает личный кабинет"
                        >
                        <label class="topic__input-label" for="user-area">Не работает личный кабинет</label>
                    </div>
                    <div class="topic__reason">
                        <input
                            class="topic__reason_isAnother"
                            placeholder="Другое"
                            type="text"
                        >
                    </div>
                </div>
            </div>
            <div class="problem-description">
                <h3 class="problem-description__title">Описание пробемы <span class="required">*</span></h3>
                <textarea
                    required
                    class="problem-description__reason"
                    placeholder="Введите текст"
                    value="" 
                    id="problem-description"
                ></textarea>
            </div>
            <div class="file-loading">
                <h3 class="file-loading__title">Загрузка документов</h3>
                <p class="file-loading__hint">
                    <span>Приложите, пожалуйста, полноэкранный скриншот.</span>
                    <br/>
                    <span>Это поможет быстрее решить проблему</span>
                </p>
                <input class="file-loading__load" type="file">
            </div>
            <button class="appeal-form__submit">Отправить</button>
        </fieldset>
      </form>
  </div>
</template>

<script>
export default {
    name:'AppealForm',
}
</script>
