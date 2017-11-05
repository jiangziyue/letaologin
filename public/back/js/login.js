/**
 * Created by jzy on 2017/11/5.
 */
$(function () {

    var $form = $("#form");
    $form.bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    callback:{
                        message:'用户名错误'
                    }
                }
            },
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度必须在6到12之间'
                    },
                    callback:{
                        message:'密码错误'
                    }
                }
            }
        }
    });

    var validator = $form.data('bootstrapValidator');
    $form.on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑

        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data:$form.serialize(),
            success:function (data) {
                if(data.success){
                    location.href="index.html"
                }else {
                    if(data.error===1000){
                        validator.updateStatus("username", "INVALID", "callback")
                    }
                    if(data.error===1001){
                        validator.updateStatus("username", "INVALID", "callback")
                    }

                }
            }

        })
    });
    //3. 表单重置功能
    $("[type='reset']").on("click", function () {
        //调用插件的重置表单的方法。
        ///获取到表单校验实例，调用了resetForm方法，重置表单。
        validator.resetForm();
    })
});