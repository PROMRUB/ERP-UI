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
              <label class="input-box-label form-text" for="taxId">อาคาร:</label>
              <input class="input-box form-input" type="text" id="taxId" name="customerId">
            </div>
            <div class="form-line">
              <label class="input-box-label form-text" for="taxId">ห้องเลขที่:</label>
              <input class="input-box form-input" type="text" id="taxId" name="taxId">
            </div>
            <div class="form-line">
              <label class="input-box-label form-text" for="brnName">ชั้นที่:</label>
              <input class="input-box form-input" type="text" id="taxId" name="taxId">
            </div>
            <div class="form-line">
              <label class="input-box-label form-text" for="orgName">หมู่บ้าน:</label>
              <input class="input-box form-input" type="text" id="taxId" name="taxId">
            </div>
            <div class="form-line">
              <label class="input-box-label form-text" for="address">เลขที่:</label>
              <input class="input-box form-input" type="text" id="taxId" name="taxId">
            </div>
            <div class="form-line">
              <label class="input-box-label form-text" for="address">หมู่ที่:</label>
              <input class="input-box form-input" type="text" id="taxId" name="taxId">
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
        <div class="save-btn">
          <span class="">บันทึก</span>
        </div>
        <div class="cancel-btn">
          <span class="">ยกเลิก</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.card {
  position: absolute;
  width: 1500px;
  height: 648px;
  left: 288px;
  top: 183px;
  background: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 2em;
}

.input-box-label {
  display: inline-block;
  width: 200px;
  /* adjust as needed */
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
  padding: 0px;
  gap: 0px 58px;
  width: 159px;
  height: 21px;
  left: 60px;
  top: 0px;
  flex: none;
  order: 2;
  flex-grow: 0;
  z-index: 2;
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


.save-btn {
  position: absolute;
  width: 163px;
  height: 48px;
  left: 1003px;
  top: 500px;
  background: #00275E;
  border-radius: 4px;
  color: white;
  padding: 12px 0px 10px 62px;
}

.cancel-btn {
  position: absolute;
  width: 163px;
  height: 48px;
  left: 1203px;
  top: 500px;
  background: #FF0000;
  border-radius: 4px;
  color: white;
  padding: 12px 0px 10px 62px;
}
</style>
