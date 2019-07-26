/* eslint-disable */
export const mockMenuData = [
    {
        'path': '/multilevel',
        'name': 'multilevel',
        'meta': {
            'icon': 'md-menu',
            'title': '多级菜单'
        },
        'component': 'Main',
        'children': [
            {
                'path': '/level_2_1',
                'name': 'level_2_1',
                'meta': {
                    'icon': 'md-funnel',
                    'title': '二级-1'
                },
                'component': 'multilevel/level-2-1'
            },
            {
                'path': '/level_2_2',
                'name': 'level_2_2',
                'meta': {
                    'icon': 'md-funnel',
                    'showAlways': true,
                    'title': '二级-2'
                },
                'component': 'parentView',
                'children': [
                    {
                        'path': '/level_2_2_1',
                        'name': 'level_2_2_1',
                        'meta': {
                            'icon': 'md-funnel',
                            'title': '三级'
                        },
                        'component': 'multilevel/level-2-2/level-2-2-1'
                    },
                    {
                        'path': '/level_2_2_2',
                        'name': 'level_2_2_2',
                        'meta': {
                            'icon': 'md-funnel',
                            'title': '三级'
                        },
                        'component': 'multilevel/level-2-2/level-2-2-2'
                    }
                ]
            },
            // {
            //     'path': '/level_2_3',
            //     'name': 'level_2_3',
            //     'meta': {
            //         'icon': 'md-funnel',
            //         'title': '二级-3'
            //     },
            //     'component': 'multilevel/level-2-3'
            // }
        ]
    }
]