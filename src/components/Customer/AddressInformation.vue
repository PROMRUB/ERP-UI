<script setup>
const profileStore = useProfileStore();
</script>

<template>
    <div class="about card">
        <div class="container">
            <div class="row">
                <div class="column">
                    <div class="form-group">
                        <div class="form-line">
                            <label class="input-box-label form-text" for="building">อาคาร:</label>
                            <input class="input-box form-input" type="text" id="building" name="building"
                                v-model="profileStore.address.building" disabled>
                        </div>
                        <div class="form-line">
                            <label class="input-box-label form-text" for="floorLv">ชั้นที่:</label>
                            <input class="input-box form-input" type="text" id="floorLv" name="floorLv"
                                v-model="profileStore.address.floorLv" disabled>
                        </div>
                        <div class="form-line">
                            <label class="input-box-label form-text" for="no">เลขที่:</label>
                            <input class="input-box form-input" type="text" id="no" name="no"
                                v-model="profileStore.address.no" disabled>
                        </div>
                        <div class="form-line">
                            <label class="input-box-label form-text" for="alley">ตรอก/ซอย:</label>
                            <input class="input-box form-input" type="text" id="alley" name="alley"
                                v-model="profileStore.address.alley" disabled>
                        </div>
                        <div class="form-line">
                            <label class="input-box-label form-text" for="province">จังหวัด:</label>
                            <v-select class="input-box form-input" :options="options" id="province" name="province"
                                style="display: inline-table;position:absolute;left:186px;top:42.5%"
                                :disabled="true"></v-select>
                        </div>
                        <div class="form-line">
                            <label class="input-box-label form-text" for="subdistrict">ตำบล/แขวง:</label>
                            <v-select class="input-box form-input" :options="options" id="subdistrict"
                                name="subdistrict" style="display: inline-table;position:absolute;left:186px;top:50.5%"
                                :disabled="true"></v-select>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="form-group">
                        <div class="form-line">
                            <label class="input-box-label form-text" for="taxId">ตรอก/ซอย:</label>
                            <input class="input-box form-input" type="text" id="taxId" name="customerId">
                        </div>
                        <div class="form-line">
                            <label class="input-box-label form-text" for="taxId">ถนน:</label>
                            <input class="input-box form-input" type="text" id="taxId" name="taxId">
                        </div>
                        <div class="form-line">
                            <label class="input-box-label form-text" for="taxId">จังหวัด:</label>
                            <input class="input-box form-input" type="text" id="taxId" name="customerId">
                        </div>
                        <div class="form-line">
                            <label class="input-box-label form-text" for="taxId">อำเภอ/เขต:</label>
                            <input class="input-box form-input" type="text" id="taxId" name="customerId">
                        </div>
                        <div class="form-line">
                            <label class="input-box-label form-text" for="brnName">ตำบล/แขวง:</label>
                            <input class="input-box form-input" type="text" id="taxId" name="taxId">
                        </div>
                        <div class="form-line">
                            <label class="input-box-label form-text" for="taxId">รหัสไปรษณี:</label>
                            <input class="input-box form-input" type="text" id="taxId" name="customerId">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { useProfileStore } from '@/stores/ProfileStore'

export default {
    components: {
    },
    data() {
        return {
            profileStore: useProfileStore()
        };
    },
    mounted() {
        this.updateComponent()
    },
    updated() {
        this.updateComponent()
    },
    methods: {
        updateComponent() {
            let token = sessionStorage.getItem('token');
            if (token == '' || token == undefined || token == null) {
                this.profileStore.isSignIn = false
                this.$router.push('/signin')
            }
            else {
                this.profileStore.isSignIn = true
            }
        },
    }
};
</script>

<style>
.card {
    position: absolute;
    width: 1300px;
    height: 648px;
    left: 350px;
    top: 175px;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
    border-radius: 0px;
    padding: 2em;
}

.input-box-label {
    display: inline-block;
    width: 125px;
    text-align: right;
    margin-right: 10px;
    height: 21px;
    font-family: 'Kanit';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 21px;
    color: #231F20;
    order: 0;
    flex-grow: 0;
    z-index: 0;
}

.input-box {
    gap: 0px 58px;
    width: 159px;
    height: 30px;
    left: 60px;
    top: 0px;
    flex: none;
    order: 2;
    flex-grow: 0;
    z-index: 2;
    font-size: 20px;
}

.input-box:focus {
    outline: none;
}

.input-box:disabled {
    background-color: #fff;
}

.vs__dropdown-toggle,
.vs--disabled .vs__dropdown-toggle,
.vs--disabled .vs__clear,
.vs--disabled .vs__search,
.vs--disabled .vs__selected,
.vs--disabled .vs__open-indicator {
    border: none;
    background-color: none;
}

.card-header {
    width: 100%;
    height: 48px;
    left: 288px;
    top: 183px;
    background: #00275E;
    border-radius: 4px 4px 0px 0px;
}

.radio-group {
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin: 20px;
}

.form-group {
    gap: 10px;
}

.form-line {
    margin-top: 26px;
}

.form-text {
    left: 0%;
    right: 81.74%;
    top: 0%;
    bottom: 19.23%;
    font-family: 'Kanit';
    font-style: normal;
    font-weight: 700;
    font-size: 18x;
    line-height: 21px;
    text-align: right;
    color: #231F20;
}

.form-input {
    border: none;
    border-bottom: 1px solid #00275E;
    width: 350px;
}

.row {
    display: flex;
}

.column {
    float: left;
    width: 50%;
}

.row:after {
    content: "";
    display: table;
    clear: both;
}
</style>