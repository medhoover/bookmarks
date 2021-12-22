<script lang="ts">
  export let Icon: any
  export let onClick = undefined
  export let _class = ''
</script>

<div
  class={`group h-[97px] w-full flex flex-col-reverse justify-between bg-no-repeat custom-mask cursor-pointer ${_class}`}
  on:click|stopPropagation={onClick}>
  <button class="w-10 h-10 mx-auto rounded-full flex justify-center items-center bg-blue-700">
    <svelte:component this={Icon} />
  </button>
  <div class="mt-3 text-center font-bold arrow-down invisible group-hover:visible">
    <slot />
  </div>
</div>

<style>
  .custom-mask {
    background-image: url('/img/bookmark_actionbg.svg');
    background-position: bottom;
    background-size: 1px;
    transition: background-size 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .custom-mask:hover {
    background-size: 100%;
  }
</style>
