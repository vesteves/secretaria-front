<template>
  <q-page class="row items-center justify-evenly">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="col col-md-6 q-gutter-md"
    >
      <q-input
        type="email"
        v-model="email"
        label="E-mail"
      />

      <q-input
        type="password"
        v-model="password"
        label="Senha"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { login } from 'src/services/auth';
import { ref } from 'vue';
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'LoginPage'
});

const $q = useQuasar()
const router = useRouter()

const email = ref<string>('')
const password = ref<string>('')

const onSubmit = async () => {
  try {
    const result = await login({
      email: email.value,
      password: password.value
    })
    
    $q.localStorage.set('token', result.data.token.plainTextToken)

    router.push('/admin/groups')
  } catch (error: unknown) {
    console.log(error)
  }
}

const onReset = () => {
  email.value = ''
  password.value = ''
}

</script>
