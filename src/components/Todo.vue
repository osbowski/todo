<template>
  <li>
    <p>{{ body }}</p>
    <p>Dedline: {{ deadline }}</p>
    <button>Done!</button>
    <button>Edit</button>
  </li>
</template>

<script>
export default {
    props:['body', 'deadline', 'id'],
    setup() {
    },
}
</script>
