
<script setup>
    import {useData} from 'vitepress'
    import {onMounted} from 'vue'
    const {title, params} = useData()
    onMounted(()=>{
        window.document.title = `${params.value.year}年${params.value.month}月${params.value.day}日 更新内容`
    })
</script>

# {{$params.year}}年{{$params.month}}月{{$params.day}}日 更新内容

```
<!-- @content -->
```