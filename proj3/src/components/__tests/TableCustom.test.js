import { mount } from '@vue/test-utils'
import TableCustom from '../TableCustom.vue'

const wrapper = mount(TableCustom)

test('input', async () => {
    await wrapper.find('#size').setValue("4")
    await wrapper.find('#id0').setValue('1');
    await wrapper.find('#id1').setValue('2');
    await wrapper.find('#id2').setValue('3');
    await wrapper.find('#id3').setValue('4');
    await wrapper.find('#id4').setValue('1');
    await wrapper.find('#id5').setValue('4');
    await wrapper.find('#id6').setValue('9');
    await wrapper.find('#id7').setValue('16');
})
test('lagrang',async () => {
    await wrapper.find('#x').setValue('5');
    expect(wrapper.html()).toContain('Лагранж для Х = 25')
})

test('Newton', async ()=> {
    await wrapper.find('#x').setValue('6');
    expect(wrapper.html()).toContain('Ньютон для Х = 36')

})