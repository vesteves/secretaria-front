<template>
  <q-page padding>
    <div>Adicionar usuário</div>

    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input v-model="name" label="Nome" />

      <q-input v-model="email" label="E-mail" type="email" />

      <q-input v-model="password" label="Senha" type="password" />

      <q-select
        v-model="profile"
        :options="profileOptions"
        emit-value
        map-options
        label="Perfil"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />

        <q-btn
          color="primary"
          label="Voltar"
          to="/admin/users"
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { store } from 'src/services/admin/users';
import { useRouter } from 'vue-router';
import { Profile } from 'src/services/admin/users.d';

const router = useRouter();

const name = ref<string>('')
const email = ref<string>('');
const profile = ref<Profile>(Profile.ADMIN);
const password = ref<string>('');

const profileOptions = [
  {
    label: 'Admin',
    value: 'admin'
  },
  {
    label: 'Professor',
    value: 'teacher'
  },
  {
    label: 'Secretária',
    value: 'secretary'
  }
]

const onSubmit = async () => {
  try {
    const result = await store({
      name: name.value,
      email: email.value,
      profile: profile.value,
      password: password.value,
    });
    console.log(result);
    await router.push('/admin/users');
  } catch (error: unknown) {
    console.log(error);
  }
};

const onReset = () => {
  name.value = '';
  email.value = '';
  profile.value = Profile.ADMIN;
};
</script>
