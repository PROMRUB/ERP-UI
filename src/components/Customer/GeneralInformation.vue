<template>
    <div class="about card">
        <div class="container">
            <div class="radio-group">
                <input type="radio" id="one" value="One" />
                <label for="one">นิติบุคคล</label>

                <input type="radio" id="two" value="Two" />
                <label for="one">บุคคลธรรมดา</label>
            </div>
            <hr>
            <div class="row">
                <div class="column">
                    <div class="form-group">
                        <div class="form-line">
                            <label class="input-box-label form-text" for="taxId">รหัสลูกค้า:</label>
                            <input class="input-box" type="text" id="taxId" name="customerId">
                        </div>
                        <div class="form-line">
                            <label class="input-box-label form-text" for="taxId">เลขประจำตัวผู้เสียภาษี:</label>
                            <input class="input-box" type="text" id="taxId" name="taxId">
                        </div>
                        <div class="form-line">
                            <label class="input-box-label form-text" for="brnName">สาขา:</label>
                            <input class="input-box" type="text" id="taxId" name="taxId">
                        </div>
                        <div class="form-line">
                            <label class="input-box-label form-text" for="orgName">ชื่อผู้ประกอบการ:</label>
                            <input class="input-box" type="text" id="taxId" name="taxId">
                        </div>
                        <div class="form-line">
                            <label class="input-box-label form-text" for="address">ชื่อสถานประกอบการ:</label>
                            <input class="input-box" type="text" id="taxId" name="taxId">
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="form-group">
                        <div class="form-line">
                            <label class="input-box-label form-text" for="taxId">โทรศัพท์:</label>
                            <input class="input-box" type="text" id="taxId" name="customerId">
                        </div>
                        <div class="form-line">
                            <label class="input-box-label form-text" for="taxId">URL:</label>
                            <input class="input-box" type="text" id="taxId" name="taxId">
                        </div>
                        <div class="form-line">
                            <label class="input-box-label form-text" for="brnName">E-Mail:</label>
                            <input class="input-box" type="text" id="taxId" name="taxId">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

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
    width: 200px;
    text-align: right;
    margin-right: 10px;
    height: 21px;
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
    margin: 20px;
}

.form-line {
    margin-top: 26px;
}

.form-text {
    left: 0%;
    right: 81.74%;
    top: 0%;
    bottom: 19.23%;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
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