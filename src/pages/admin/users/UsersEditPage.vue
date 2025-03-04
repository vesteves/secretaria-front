<template>
  <q-page padding>
    <div>Editar usuário</div>

    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input v-model="name" label="Nome" />

      <q-input v-model="email" label="E-mail" type="email" />

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
import { onMounted, ref } from 'vue';
import { getById, update } from 'src/services/admin/users';
import { useRoute, useRouter } from 'vue-router';
import { Profile } from 'src/services/admin/users.d';

const name = ref<string>('')
const email = ref<string>('');
const profile = ref<Profile>(Profile.ADMIN);

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

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const result = await getById(Number(route.params.id));
  name.value = result.data.name;
  email.value = result.data.email;
  profile.value = result.data.profile;
});

const onSubmit = async () => {
  try {
    await update(Number(route.params.id), {
      name: name.value,
      email: email.value,
      profile: profile.value,
    });
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
