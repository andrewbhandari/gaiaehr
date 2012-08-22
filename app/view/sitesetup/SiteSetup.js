Ext.define('App.view.sitesetup.SiteSetup', {
    extend: 'Ext.window.Window',
    title:'GaiaEHR Site Setup',
    bodyPadding: 5,
    y          : 90,
    width      : 900,
    height     : 500,
    plain      : true,
    modal      : false,
    resizable  : false,
    draggable  : false,
    closable   : false,
    bodyStyle  : 'background-color: #ffffff; padding: 5px;',
    layout:{
        type:'vbox',
        align:'stretch'
    },
    initComponent: function() {
        var me = this;

        var obj;
        var conn;
        var field;
        // *************************************************************************************
        // Structure, data for storeReq
        // AJAX -> requirements.ejs.php
        // *************************************************************************************
//        Ext.define("Requirements", {extend: "Ext.data.Model",
//            fields                        : [
//                {name: 'msg', type: 'string'},
//                {name: 'status', type: 'string'}
//            ]
//        });
//        function status(val) {
//            if(val == 'Ok') {
//                return '<span style="color:green;">' + val + '</span>';
//            } else {
//                return '<span style="color:red;">' + val + '</span>';
//            }
//        }
//
//        var storeSites = Ext.create('Ext.data.Store', {
//            model   : 'Requirements',
//            proxy   : {
//                type  : 'ajax',
//                url   : 'install/requirements.ejs.php',
//                reader: {
//                    type: 'json'
//                }
//            },
//            autoLoad: true
//        });
//
//        // *************************************************************************************
//        // grid to show all the requirements status
//        // *************************************************************************************
//        var reqGrid = Ext.create('Ext.grid.Panel', {
//            id        : 'reqGrid',
//            store     : storeSites,
//            frame     : false,
//            border    : false,
//            viewConfig: {stripeRows: true},
//            columns   : [
//                {
//                    text     : 'Requirements',
//                    flex     : 1,
//                    sortable : false,
//                    dataIndex: 'msg'
//                },
//                {
//                    text     : 'Status',
//                    width    : 150,
//                    sortable : true,
//                    renderer : status,
//                    dataIndex: 'status'
//                }
//            ]
//        });
//
        // *************************************************************************************
        // The Copyright Notice Window
        // *************************************************************************************
        me.winCopyright = Ext.create('widget.window', {
            id         : 'winCopyright',
            width      : 900,
            height     : 500,
            y          : 90,
            closeAction: 'hide',
            bodyStyle  : 'background-color: #ffffff; padding: 5px;',
            modal      : false,
            resizable  : true,
            title      : 'GaiaEHR Copyright Notice',
            draggable  : true,
            //closable   : false,
            autoLoad   : 'gpl-licence-en.html',
            autoScroll : true,
            dockedItems: [
                {
                    dock   : 'bottom',
                    frame  : false,
                    border : false,
                    buttons: [
                        {
                            text   : 'Close',
                            margin : '0 10 0 5',
                            name   : 'btn_reset',
                            handler: function(btn) {
                                btn.up('window').close();
                            }
                        }
                    ]
                }
            ]
        });
//        winCopyright.show();
//
        // *************************************************************************************
        // Install proccess form
        // *************************************************************************************

        var formInstall = Ext.create('Ext.form.Panel', {
            id           : 'formInstall',
            bodyStyle    : 'padding:5px',
            border       : false,
            url          : 'install/logic.ejs.php',
            layout       : 'fit',
            fieldDefaults: {
                msgTarget : 'side',
                labelWidth: 130
            },
            defaults     : {
                anchor: '100%'
            },
            items        : [
                {
                    xtype    : 'tabpanel',
                    id       : 'tabsInstall',
                    plain    : true,
                    border   : false,
                    activeTab: 0,
                    defaults : {bodyStyle: 'padding:10px'},
                    items    : [
                        {
                            title     : 'Instructions',
                            layout    : 'fit',
                            autoLoad  : 'install/instructions.html',
                            autoScroll: true,
                            buttons   : [
                                {
                                    text   : 'Next',
                                    handler: function() {
                                        Ext.getCmp('clinicInfo').enable();
                                        Ext.getCmp('tabsInstall').setActiveTab(1);
                                    }
                                }
                            ]
                        },
                        {
                            title      : 'Site Information',
                            defaults   : {width: 530},
                            id         : 'clinicInfo',
                            defaultType: 'textfield',
                            disabled   : true,
                            items      : [
                                {
                                    xtype     : 'textfield',
                                    name      : 'siteName',
                                    id        : 'siteNameField',
                                    labelAlign: 'top',
                                    fieldLabel: 'Site Name (Your Main Clinic\'s Name)',
                                    allowBlank: false,
                                    listeners : {
                                        validitychange: function() {
                                            field = Ext.getCmp('siteNameField');
                                            if(field.isValid()) {
                                                Ext.getCmp('clinicInfoNext').enable();
                                            } else {
                                                Ext.getCmp('clinicInfoNext').disable();
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'displayfield',
                                    value: 'Tips...'
                                },
                                {
                                    xtype: 'displayfield',
                                    value: '<span style="color:red;">* A Site will have their own database and will no be able to communicate with other sites.</span>'
                                },
                                {
                                    xtype: 'displayfield',
                                    value: '<span style="color:green;">* If not sure what name to choose for your site, just type "default".</span>'
                                },
                                {
                                    xtype: 'displayfield',
                                    value: '<span style="color:green;">* A Site can have multiple clinics.</span>'
                                },
                                {
                                    xtype: 'displayfield',
                                    value: '<span style="color:green;">* Why "Site Name" and no "Clinic\' Name"?</span> Basically because you can have more than one installation using the same webserver. ei. Two physician that share the same office but no their patients.'
                                },
                                {
                                    xtype: 'displayfield',
                                    value: '<span style="color:green;">* more tips to come...</span>'
                                }
                            ],
                            buttons    : [
                                {
                                    text   : 'Back',
                                    handler: function() {
                                        Ext.getCmp('tabsInstall').setActiveTab(0);
                                    }
                                },
                                {
                                    text    : 'Next',
                                    id      : 'clinicInfoNext',
                                    disabled: true,
                                    handler : function() {
                                        Ext.getCmp('databaseInfo').enable();
                                        Ext.getCmp('tabsInstall').setActiveTab(2);
                                    }
                                }
                            ]
                        },
                        {
                            title      : 'Database Information',
                            defaults   : {width: 530},
                            id         : 'databaseInfo',
                            defaultType: 'textfield',
                            disabled   : true,
                            items      : [
                                {
                                    xtype  : 'displayfield',
                                    padding: '10px',
                                    value  : 'Choose if you want to <a href="javascript:void(0);" onClick="Ext.getCmp(\'rootFieldset\').enable();">create a new database</a> or use an <a href="javascript:void(0);" onClick="Ext.getCmp(\'dbuserFieldset\').enable();">existing database</a><br>'
                                },
                                {
                                    xtype         : 'fieldset',
                                    id            : 'rootFieldset',
                                    checkboxToggle: true,
                                    title         : 'Create a New Database (Root Access Needed)',
                                    defaultType   : 'textfield',
                                    collapsed     : true,
                                    disabled      : true,
                                    layout        : 'anchor',
                                    defaults      : {anchor: '100%'},
                                    items         : [
                                        {
                                            fieldLabel: 'Root User',
                                            name      : 'rootUser',
                                            allowBlank: false
                                        },
                                        {
                                            fieldLabel: 'Root Password',
                                            name      : 'rootPass',
                                            id        : 'rootPass',
                                            inputType : 'password',
                                            allowBlank: true
                                        },
                                        {
                                            fieldLabel: 'SQL Server Host',
                                            name      : 'dbHost',
                                            allowBlank: false
                                        },
                                        {
                                            fieldLabel: 'SQL Server Port',
                                            name      : 'dbPort',
                                            allowBlank: false
                                        },
                                        {
                                            fieldLabel: 'Database Name',
                                            name      : 'dbName',
                                            allowBlank: false
                                        },
                                        {
                                            fieldLabel: 'New Database User',
                                            name      : 'dbUser',
                                            allowBlank: false
                                        },
                                        {
                                            fieldLabel: 'New Database Pass',
                                            name      : 'dbPass',
                                            inputType : 'password',
                                            allowBlank: false
                                        }
                                    ],
                                    listeners     : {
                                        enable: function() {
                                            conn = 'root';
                                            Ext.getCmp('dbuserFieldset').collapse();
                                            Ext.getCmp('dbuserFieldset').disable();
                                            Ext.getCmp('rootFieldset').expand();

                                        }
                                    }
                                },
                                {
                                    xtype         : 'fieldset',
                                    id            : 'dbuserFieldset',
                                    checkboxToggle: true,
                                    title         : 'Install on a existing database',
                                    defaultType   : 'textfield',
                                    collapsed     : true,
                                    disabled      : true,
                                    layout        : 'anchor',
                                    defaults      : {anchor: '100%'},
                                    items         : [
                                        {
                                            fieldLabel: 'Database Name',
                                            name      : 'dbName',
                                            allowBlank: false
                                        },
                                        {
                                            fieldLabel: 'Database User',
                                            name      : 'dbUser',
                                            allowBlank: false
                                        },
                                        {
                                            fieldLabel: 'Database Pass',
                                            name      : 'dbPass',
                                            id        : 'dbPass',
                                            inputType : 'password',
                                            allowBlank: false
                                        },
                                        {
                                            fieldLabel: 'Database Host',
                                            name      : 'dbHost',
                                            allowBlank: false
                                        },
                                        {
                                            fieldLabel: 'Database Port',
                                            name      : 'dbPort',
                                            allowBlank: false
                                        }
                                    ],
                                    listeners     : {
                                        enable: function() {
                                            conn = 'user';
                                            Ext.getCmp('rootFieldset').collapse();
                                            Ext.getCmp('rootFieldset').disable();
                                            Ext.getCmp('dbuserFieldset').expand();

                                        }
                                    }
                                }
                            ],
                            buttons    : [
                                {
                                    text   : 'Back',
                                    handler: function() {
                                        Ext.getCmp('tabsInstall').setActiveTab(1);
                                    }
                                },
                                {
                                    text   : 'Test Database Credentials',
                                    id     : 'dataTester',
                                    handler: function() {
                                        var form = this.up('form').getForm();
                                        if(form.isValid()) {
                                            form.submit({
                                                method : 'POST',
                                                params : {
                                                    task: 'connType',
                                                    conn: conn
                                                },
                                                success: function(form, action) {
                                                    var obj = Ext.JSON.decode(action.response.responseText);
                                                    Ext.Msg.alert('Sweet!', obj.msg);
                                                    Ext.getCmp('dataInfoNext').enable();
                                                },
                                                failure: function(form, action) {
                                                    var obj = Ext.JSON.decode(action.response.responseText);
                                                    Ext.Msg.alert('Oops!', obj.msg);
                                                    Ext.getCmp('dataInfoNext').disable();
                                                }
                                            });
                                        }
                                    }
                                },
                                {
                                    text    : 'Next',
                                    id      : 'dataInfoNext',
                                    disabled: true,
                                    handler : function() {
                                        Ext.getCmp('adminInfo').enable(3);
                                        Ext.getCmp('tabsInstall').setActiveTab(3);
                                    }
                                }
                            ]
                        },
                        {
                            title      : 'Administrator Information',
                            defaults   : {width: 530},
                            id         : 'adminInfo',
                            defaultType: 'textfield',
                            disabled   : true,
                            items      : [
                                {
                                    xtype: 'displayfield',
                                    value: 'Choose Administrator Username and Password'
                                },
                                {
                                    xtype  : 'displayfield',
                                    padding: '0 0 10px 0',
                                    value  : '(This account will be the Super User/Global Admin with access to all areas)'
                                },
                                {
                                    fieldLabel: 'Administrator Username',
                                    name      : 'adminUser',
                                    padding   : '0 0 10px 0'
                                },
                                {
                                    fieldLabel: 'Administrator Password',
                                    type      : 'password',
                                    name      : 'adminPass',
                                    inputType : 'password'
                                }
                            ],
                            buttons    : [
                                {
                                    text   : 'Back',
                                    handler: function() {
                                        Ext.getCmp('tabsInstall').setActiveTab(2);
                                    }
                                },
                                {
                                    text   : 'Finish',
                                    handler: function() {
                                        var form = this.up('form').getForm();
                                        if(form.isValid()) {
                                            form.submit({
                                                method : 'POST',
                                                params : {
                                                    task: 'install'
                                                },
                                                success: function(form, action) {
                                                    obj = Ext.JSON.decode(action.response.responseText);
                                                    Ext.Msg.alert('Sweet!', obj.msg, function(btn, text) {
                                                        if(btn == 'ok') {
                                                            window.location = "index.php"
                                                        }
                                                    });

                                                },
                                                failure: function(form, action) {
                                                    obj = Ext.JSON.decode(action.response.responseText);
                                                    Ext.Msg.alert('Oops!', obj.msg);
                                                    Ext.getCmp('dataInfoNext').disable();
                                                }
                                            });
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        });
//



        me.items = [
            me.headerPanel = Ext.create('Ext.Container',{
                cls:'siteSetupHeader',
                height:40,
                items:[
                    me.welcomeBtn = Ext.create('Ext.Button',{
                        scale   : 'large',
                        iconCls : 'icoGrayFace',
                        componentCls:'setupBts',
                        margin:'0 38 0 0',
                        iconAlign: 'right',
                        enableToggle :true,
                        toggleGroup:'siteSetup',
                        text:'1.Welcome!'
                    }),
                    me.compatibiltyBtn = Ext.create('Ext.Button',{
                        scale   : 'large',
                        iconCls : 'icoGrayFace',
                        componentCls:'setupBts',
                        margin:'0 38 0 0',
                        iconAlign: 'right',
                        enableToggle :true,
                        toggleGroup:'siteSetup',
                        text:'2.System Compatibility'
                    }),
                    me.databaseBtn = Ext.create('Ext.Button',{
                        scale   : 'large',
                        iconCls : 'icoGrayFace',
                        componentCls:'setupBts',
                        margin:'0 38 0 0',
                        iconAlign: 'right',
                        enableToggle :true,
                        toggleGroup:'siteSetup',
                        text:'3.Database Configuration'
                    }),
                    me.siteConfigurationBtn = Ext.create('Ext.Button',{
                        scale   : 'large',
                        iconCls : 'icoGrayFace',
                        componentCls:'setupBts',
                        margin:'0 38 0 0',
                        iconAlign: 'right',
                        enableToggle :true,
                        toggleGroup:'siteSetup',
                        text:'Site Configuration'
                    }),
                    me.completeBtn = Ext.create('Ext.Button',{
                        scale   : 'large',
                        iconCls : 'icoGrayFace',
                        componentCls:'setupBts',
                        iconAlign: 'right',
                        enableToggle :true,
                        toggleGroup:'siteSetup',
                        text:'4.Installation Complete!'
                    })
                ]
            }),
            me.mainPanel = Ext.create('Ext.Container',{
                flex:1,
                layout:'card',
                items: [
                    me.welcome = Ext.create('Ext.Container', {
                        items:[
                            {
                                xtypr:'container',
                                styleHtmlContent:true,
                                border:false,
                                padding:10,
                                autoLoad:'welcome.html'
                            },
                            {
                                xtype:'fieldset',
                                title: 'License Agreement',
                                defaultType: 'textfield',
                                layout: 'anchor',
                                items :[
                                    me.licAgreement = Ext.create('Ext.form.field.Checkbox', {
                                        boxLabel  : 'I agree to the GaiaEHR terms and conditions',
                                        name      : 'topping',
                                        inputValue: '1'
                                    }),
                                    {
                                        xtype:'button',
                                        componentCls:'setupBts',
                                        text:'Read GPLv3 Licence',
                                        //width:300,
                                        handler:function(){
                                            me.winCopyright.show();
                                        }
                                    }
                                ]
                            }
                        ]
                    }),
                    {


                    }
                ]
            })
        ];

        me.buttons = [
            {
                text:'Back',
                scope:me,
                id:'move-prev',
                handler:me.onStepBack
            },
            '->',
            {
                text:'Next',
                scope:me,
                id:'move-next',
                handler:me.onNexStep
            }
        ];
        me.callParent();
    },

    onNexStep:function(){
        this.navigate(this.mainPanel, 'next');
    },

    onStepBack:function(){
        this.navigate(this.mainPanel, 'prev');
    },

    navigate:function(panel, direction){
        var layout = panel.getLayout();
        layout[direction]();
        Ext.getCmp('move-prev').setVisible(layout.getPrev());
        Ext.getCmp('move-next').setVisible(layout.getNext());
    }


});

